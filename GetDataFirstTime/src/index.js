const rp = require('request-promise');
var MongoClient = require('mongodb').MongoClient;
var mongourl = "mongodb://localhost:27017/";
const request = require('request');

const urlBase = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

const makeRequest = async () => {
    await MongoClient.connect(mongourl, async (err, db) => {
        if (err) throw err;
        var dbo = db.db("test");
        await dbo.dropCollection("newsFromPage", function (err, delOK) {
            if (err) {
                return;
            }
            if (delOK) console.log("Collection deleted");
        });
        await dbo.createCollection("newsFromPage", (err, res) => {
            if (err) throw err;
            console.log("Collection created!");
            return;
        });
        let response = await fnRequest();
        const jsonRes = JSON.parse(response);
        jsonRes.hits.forEach(element => {
            dbo.collection("newsFromPage").insertOne(element, (err, res) => {
                if (err) throw err;
                console.log("1 document inserted");
            });
        });
        dbo.close();
    });
}

const fnRequest = () => rp(`${urlBase}`)
    .then(req => {
        let post = req;
        return post;
    });

makeRequest();