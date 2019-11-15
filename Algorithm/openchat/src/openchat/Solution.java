package openchat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.StringTokenizer;

class Solution {
	public static String[] solution(String[] record) {
		// [분석]
		// 기능은 세 가지 -> Enter, Leave, Change
		// " "으로 split해서 기능부분, id부분, 닉네임 부분으로 나눌 수 있다.
		// enter, leave + id 조합으로 result를 구성한다
		// change를 바탕으로 id와 닉네임을 map으로 저장한다
		// id를 닉네임으로 바꿔준다
		
		// [구현]
		String[] div = null; // whitespace 기준으로 나눈 배열을 받아줄 자리
		HashMap<String, String> map = new HashMap<>(); // id (key) : 닉네임 (value)를 받아줄 HashMap
		ArrayList<String[]> list = new ArrayList<>(); // 디스플레이 될 기능 목록들 (배열 변환 전)
		String msg = null; // 디스플레이 될 메시지를 받아주는 자리
		for (String r : record) {
			div = r.split(" "); // " "로 나눠줌
			if (div[0].equals("Change")) { // Change 기능일 경우
				map.put(div[1], div[2]); // 이전에 id에 저장되었던 닉네임을 바꿔준다
			} else { // Enter, Leave 기능일 경우
				if (div[0].equals("Enter")) {
					map.put(div[1], div[2]); // 새롭게 key 생성
					msg = "님이 들어왔습니다."; // Enter 시 message
				} else {
					msg = "님이 나갔습니다."; // Leave 시 message
				}
				// id와 메시지를 리스트에 추가
				list.add(Arrays.asList(div[1], msg).toArray(new String[2]));
			}
		}
		// stream-map을 통해 마지막으로 id와 닉네임을 일괄 변환 후 배열로 리턴
		return list.stream().map(v -> map.get(v[0]) + v[1]).toArray(String[]::new);
	}
	
	public static String[] solution2(String[] record) {
		// [개선점]
		// StringTokenizer, StringBuilder 등 특화 클래스 사용
		// stream을 쓰는 대신, for each문을 사용
		// 각 for문 당 if문을 최소화
		// if-not을 if-break-else 구조로 바꾸는 등의 추가적인 시도를 하였으나 유의미한 차이를 발견하지 못했음
		// [구현]
		StringTokenizer tokenizer = null;
		String cmd = null;
		HashMap<String, String> idMap = new HashMap<>();
		for (String r : record) {
			tokenizer = new StringTokenizer(r, " ");
			cmd = tokenizer.nextToken();
			if(!cmd.equals("Leave")) {
				idMap.put(tokenizer.nextToken(), tokenizer.nextToken());
			}
		}		
		ArrayList<String> answer = new ArrayList<>();
		for (String r : record) {
			tokenizer = new StringTokenizer(r, " ");
			cmd = tokenizer.nextToken();
			if(!cmd.equals("Change")) {				
				answer.add(new StringBuilder()
								.append(idMap.get(tokenizer.nextToken()))
								.append("Enter".equals(cmd) ? "님이 들어왔습니다." : "님이 나갔습니다.")
								.toString());
			}
		}
		return answer.toArray(new String[answer.size()]);
	}
}