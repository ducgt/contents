const record = [];
const member = new Map();
const online = new Set();

function message(record) {
  const idMap = new Map();
  for (let r of record) {
    const split = r.split(" ");
    const cmd = split[0];
    if (cmd != "Leave") {
      const id = split[1];
      const nick = split[2];
      idMap.set(id, nick);
    }
  }
  const messages = [];
  for (let r of record) {
    const split = r.split(" ");
    const cmd = split[0];
    if (cmd != "Change") {
      const id = split[1];
      messages.push(
        "<b>" + idMap.get(id) + "</b>" +
          (cmd == "Enter" ? "님이 들어왔습니다." : "님이 나갔습니다.")
      );
    }
  }
  return messages;
}

function add_member() {
  const new_id = document.getElementById("new_id").value;
  if(!new RegExp("^[a-zA-Z0-9 ]+$").test(new_id)){
    return alert("영문 및 숫자로만 ID를 생성할 수 있습니다!")
  }
  if(member.has(new_id)) {
    alert("이미 존재하는 ID입니다!")
  } else {
    const new_nick = document.getElementById("new_nick").value;
    member.set(new_id, new_nick);
    list_member(member);
  }
}

function list_member(member) {
  let table = `<table id="member_table"><tr><td>ID</td><td>별명</td><td>출근</td><td>퇴근</td></tr>`;
  for(let m of member) {
    table += "<tr><td>"+m[0]+"</td><td> \
    <input id=\"nick_"+m[0]+"\" type=\"text\" \
    maxlength=\"10\" minlength=\"1\" value=\""+m[1]+"\"> \
    <button onclick=\"change('"+m[0]+"')\">수정</button></td> \
    <td><button onclick=\"enter('"+m[0]+"')\">출근</button></td> \
    <td><button onclick=\"leave('"+m[0]+"')\">퇴근</button></td></tr>"
  }
  table += "</table>"
  document.getElementById("member_list").innerHTML = table;
}

function change(id) {
  console.log('수정');
  const change_nick = document.getElementById('nick_'+id).value;
  console.log(id, change_nick);
  member.set(id, change_nick);
  const msg = "Change " + id + " " + change_nick;
  console.log(msg);
  record.push(msg);
  list_member(member);
  list_message(message(record));
}

function enter(id) {
  if(online.has(id)) {
    alert("이미 출근한 ID입니다!")
  } else {
    const msg = "Enter " + id + " " + member.get(id);
    record.push(msg);
    online.add(id);
    list_message(message(record));
  }
}

function leave(id) {
  if(online.has(id)) {
    const msg = "Leave " + id;
    record.push(msg);
    online.delete(id);
    list_message(message(record));
  } else {
    alert("출근하지 않은 ID입니다!")
  }
}

function list_message(messages) {
  document.getElementById("message").innerHTML = "";
  for(let message of messages) {
    document.getElementById("message").innerHTML += message + '<br>';
  }
}