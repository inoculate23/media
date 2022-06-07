import requests

response = requests.get('https://go.xxxiijmp.com/api/models/')
data = response.json()
for i in data['models']:
            append(i)
            print(f"\"{i['url']}\" {i['username'][0]['snapshotUrl']}")
            
            print(response.json())