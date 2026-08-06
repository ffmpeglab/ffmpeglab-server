RENDER=$(curl -X POST ${API_HOST}/renders \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "project": {
      "id": "myproject",
      "title": "myproject",
      "editor": {
        "code": "-i $MEDIA_1 -movflags +faststart -y $OUTPUT_PATH",
        "selectedCode": "custom"
      }
    },
    "layers": [
      {
        "id": "layer1",
        "media": [
          {
            "id": "media1",
            "url": "https://www.ffmpeglab.com/media/zoompan.mp4",
            "folderId":"myfolder",
            "filename":"zoompan.mp4",
            "encoding":{}
          }
        ],
        "editor":{}
      }
    ]
  }')

RENDER_ID=$(echo "${RENDER}" | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"\(.*\)"/\1/')

echo "RENDER_ID: ${RENDER_ID}"


RUN=$(curl -X PUT $API_HOST/renders/run \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"id\": \"$RENDER_ID\"}")

curl -X GET $API_HOST/renders/${RENDER_ID} \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json"

echo '\n'

sleep 3

curl -X GET $API_HOST/renders/${RENDER_ID} \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json"

echo '\n'

sleep 5

curl -X GET $API_HOST/renders/${RENDER_ID} \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json"

echo '\n'