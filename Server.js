"use strict";
const Http = require("http");
const Url = require("url");
var L04_Interfaces;
(function (L04_Interfaces) {
    // Person wird unter Matrikelnummer gespeichert
    let studiHomoAssoc = {};
    let port = process.env.PORT;
    if (port == undefined)
        port = 8200;
    let server = Http.createServer((_request, _response) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleRequest(_request, _response) {
        console.log("Ich höre Stimmen!");
        let query = Url.parse(_request.url, true).query;
        console.log(query["command"]);
        if (query["command"]) {
            switch (query["command"]) {
                case "insert":
                    insert(query, _response);
                    break;
                case "refresh":
                    refresh(_response);
                    break;
                case "refresh2":
                    search(query, _response);
                    break;
            }
        }
        _response.end();
    }
    function insert(query, _response) {
        let obj = JSON.parse(query["data"]);
        let _name = obj.name;
        let _firstname = obj.firstname;
        let matrikel = obj.matrikel.toString();
        let _age = obj.age;
        let _gender = obj.gender;
        let _studiengang = obj.studiengang;
        let studi;
        studi = {
            name: _name,
            firstname: _firstname,
            matrikel: parseInt(matrikel),
            age: _age,
            gender: _gender,
            studiengang: _studiengang
        };
        studiHomoAssoc[matrikel] = studi;
    }
    function refresh(_response) {
        console.log(studiHomoAssoc);
        for (let matrikel in studiHomoAssoc) {
            let studi = studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " years ";
            line += studi.gender ? "(M)" : "(F)";
            _response.write(line + "\n");
        }
    }
    function search(query, _response) {
        let studi = studiHomoAssoc[query["searchFor"]];
        if (studi) {
            let line = query["searchFor"] + ": ";
            line += studi.firstname + "/ " + studi.name + "/ " + studi.age + " years " + "/ " + studi.studiengang;
            line += studi.gender ? "(M)" : "(F)";
            _response.write(line);
        }
        else {
            _response.write("No student found.");
        }
    }
})(L04_Interfaces || (L04_Interfaces = {}));
//# sourceMappingURL=Server.js.map