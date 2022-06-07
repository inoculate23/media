import requests

endpoint_url = "https://stripchat.com/api/front/models"


query = f'{endpoint_url}'

response =requests.get(query, 
               headers={"Content-Type":"application/json", 

json_response = response.json()

for i in json_response['hlsPlaylist']:
            uris.append(i)
            print(f"\"{i['url']}\"  {i['',
    description: 'Big Buck Bunny - adaptive qualities',
    abr: true
  },']}")