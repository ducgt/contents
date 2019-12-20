function hide(card_id) {
    const style = document.getElementById(card_id).style;
    if(style.visibility == "hidden" ) {
        style.visibility = "visible"
        style.height = "100%"
        document.getElementById("b" + card_id.substr(1)).innerHTML = "Close"
    } else {
        style.visibility = "hidden"
        style.height = "0px"
        document.getElementById("b" + card_id.substr(1)).innerHTML = "Open"
    }
}

const friends = [
    {name: "김자바", img:"/img/face.png", group: "직장", detail: "김자바입니다!"},
    {name: "이파선", img:"/img/face.png", group: "직장", detail: "이파선입니다!"},
    {name: "최머신", img:"/img/face.png", group: "직장", detail: "최머신입니다!"},
    {name: "박철수", img:"/img/face.png", group: "학교", detail: "박철수입니다!"},
    {name: "정민수", img:"/img/face.png", group: "학교", detail: "정민수입니다!"},
    {name: "안희영", img:"/img/face.png", group: "학교", detail: "안희영입니다!"}
]

function friendsAll() {
    document.getElementById("myfriends").innerHTML = ""
    friends.forEach(v => {
        console.log(v)
        document.getElementById("myfriends").innerHTML += '<div class="bfimg"><img src="' + v.img + '"></div>';
        document.getElementById("myfriends").innerHTML
        += '<div class="bfname"><p><b>[' + v.name + "]</b> " + v.detail + ' (' + v.group  + ')</p></div>'
    });
}
function friendsGroup(group) {
    document.getElementById("myfriends").innerHTML = ""
    friends.filter(v => v.group == group).forEach(v => {
        console.log(v)
        document.getElementById("myfriends").innerHTML += '<div class="bfimg"><img src="' + v.img + '"></div>';
        document.getElementById("myfriends").innerHTML
        += '<div class="bfname"><p><b>[' + v.name + "]</b> " + v.detail + ' (' + v.group  + ')</p></div>'
    });
}

friendsAll();