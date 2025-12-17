import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:3000"
ENDPOINT = "/api/chat"
TIMEOUT = 30
AUTH = HTTPBasicAuth("peter23xp@gmail.com", "3Seniors?")

def test_post_api_chat_generate_chat_reply_via_gemini():
    url = BASE_URL + ENDPOINT
    headers = {"Content-Type": "application/json"}

    # Valid request payload
    valid_payload = {
        "messages": [
            {"role": "user", "content": "Hello, how is the weather today?"},
            {"role": "assistant", "content": "I can check that for you!"}
        ]
    }

    # 1. Test success case with valid payload
    try:
        response = requests.post(url, json=valid_payload, headers=headers, auth=AUTH, timeout=TIMEOUT)
        assert response.status_code == 200
        json_resp = response.json()
        assert isinstance(json_resp, dict)
        assert "content" in json_resp
        assert isinstance(json_resp["content"], str)
        assert len(json_resp["content"]) > 0
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    # 2. Test error case: invalid payload (missing 'messages' field)
    invalid_payload_1 = {}
    try:
        response = requests.post(url, json=invalid_payload_1, headers=headers, auth=AUTH, timeout=TIMEOUT)
        assert response.status_code == 400
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    # 3. Test error case: invalid payload (empty messages array)
    invalid_payload_2 = {"messages": []}
    try:
        response = requests.post(url, json=invalid_payload_2, headers=headers, auth=AUTH, timeout=TIMEOUT)
        assert response.status_code == 400
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    # 4. Test error case: invalid payload (messages item missing 'role')
    invalid_payload_3 = {"messages": [{"content": "Hi"}]}
    try:
        response = requests.post(url, json=invalid_payload_3, headers=headers, auth=AUTH, timeout=TIMEOUT)
        assert response.status_code == 400
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    # 5. Test error case: invalid payload (messages item missing 'content')
    invalid_payload_4 = {"messages": [{"role": "user"}]}
    try:
        response = requests.post(url, json=invalid_payload_4, headers=headers, auth=AUTH, timeout=TIMEOUT)
        assert response.status_code == 400
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    # 6. Optionally test server error by simulating invalid header or large payload if supported.
    # But since we cannot forcibly produce 500 reliably, skipping.

test_post_api_chat_generate_chat_reply_via_gemini()