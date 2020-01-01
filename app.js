const express = require("express");
var app = express();
var upload = require("express-fileupload");
const http = require("http");
http.Server(app).listen(8000); // make server listen on port 80

const Youtube = require("youtube-api"),
  fs = require("fs"),
  readJson = require("r-json"),
  Logger = require("bug-killer"),
  Lien = require("lien");
(opn = require("opn")), (prettyBytes = require("pretty-bytes"));
app.use(upload()); // configure middleware
var banana;
console.log("Server Started at port 80");
const CREDENTIALS = readJson(`${__dirname}/credentials.json`);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
// app.get("/public")
app.post("/upload", function(req, res) {
  console.log(req.files);

  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + "/uploads/" + name;
    file.mv(uploadpath, function(err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.send("Error Occured!");
      } else {
        console.log("File Uploaded", name);
        let server = new Lien({
          host: "localhost",
          port: 5000
        });
        let oauth = Youtube.authenticate({
          type: "oauth",
          client_id: CREDENTIALS.web.client_id,
          client_secret: CREDENTIALS.web.client_secret,
          redirect_url: CREDENTIALS.web.redirect_uris[0]
        });
        opn(
          oauth.generateAuthUrl({
            access_type: "offline",
            scope: ["https://www.googleapis.com/auth/youtube.upload"]
          })
        );
        server.addPage("/oauth2callback", lien => {
          Logger.log(
            "Trying to get the token using the following code: " +
              lien.query.code
          );
          oauth.getToken(lien.query.code, (err, tokens) => {
            if (err) {
              lien.lien(err, 400);
              return Logger.log(err);
            }

            Logger.log("Got the tokens.");

            oauth.setCredentials(tokens);

            lien.end(
              "The video is being uploaded. Check out the logs in the terminal."
            );

            var req = Youtube.videos.insert(
              {
                resource: {
                  // Video title and description
                  snippet: {
                    title: "Testing YoutTube API NodeJS module",
                    description: "Test video upload via YouTube API"
                  },
                  // I don't want to spam my subscribers
                  status: {
                    privacyStatus: "public"
                  }
                },
                // This is for the callback function
                part: "snippet,status",

                // Create the readable stream to upload the video
                media: {
                  body: fs.createReadStream(__dirname + "/uploads/" + name)
                }
              },
              (err, data) => {
                console.log("Done.", data);
                // res.redirect("/public");
                //  banana = data.id;
                res.redirect("/public");
                console.log("njfjf", banana);
                process.exit();
              }
            );

            setInterval(function() {
              Logger.log(
                `${prettyBytes(
                  req.req.connection._bytesDispatched
                )} bytes uploaded.`
              );
            }, 250);
          });
        });
      }
    });
  }
});
//console.log("kgkklbkglb", banana);
// process.exit();
