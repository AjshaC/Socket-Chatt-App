# Socket-Chatt-App: Chat at eleven

# Beskrivning: 
Vi har skapat en chatt-applikation med namn Chat at eleven där användare kan chatta med varandra i realtid. 
Projektet är byggt både på server och client.

För servern är kommunktionen byggd med socket.io i kombination med node.JS / express.

För client är projketet byggt med React och TypeScript. När det gäller design valde vi att använda oss av antDesign i kombination med egen CSS för att få ut önskad layout av applikationen. Applikationen är byggd för passa desktop.

I applikationen visas en startskärm där användaren fyller i önskat username och klickar sedan på Join. Chatten startas och användaren hamnar automatiskt i Lobbyn.
Användaren kan chatta med andra användare i aktuellt rum, skapa ett nytt rum eller gå med i ett redan befintligt rum som finns i listan.

För varje rum så finns en lista över vilka användare som är inloggade i just det rummet.
Lobby kommer alltid finnas kvar, alla andra rum raderas automatiskt om det inte finns någon användare i dom.

Vi har också använt oss av Giphy som gör det möjligt att skicka en slumpmässig git genom att skriva /git i inputfältet för meddelanden i chattfönstret.


# Installation
För att få igång detta projekt gör du följande:

- Börja med att se till att ha NodeJS installerat. Börja annars med att installera det enligt NodeJS dokumentation https://nodejs.org/en

- Kopiera sedan repot från GitHub https://github.com/AjshaC/Socket-Chatt-App.git

- Klona ner repot på din dator. Detta genom att öppna din Git Terminal i den mapp på din dator där du vill ha projektet sparat och kör kommandot: 
        git clone https://github.com/AjshaC/Socket-Chatt-App.git

- Öppna upp projektet i editor Visual Studio Code för att direkt härifrån nå Terminalen.


**Server**
(Du har nu projektet öppet i Visual Studio Code)
- Öppna en Terminal
        Klicka på Terminal i  VS-Code menyn
        New Terminal

- Navigera till server-mappen genom kommandot: 
        cd server

- Kör kommandot:
        npm install
(För att få tillgång till node_moduels med alla dependencies som krävs för servern)

- Starta servern genom något av följande kommandon:
        npm start för att dra igång servern mot node server.js (måste köra detta kommando vid varje ändring/tillägg i koden på server)

        eller 

        npm run dev för att köra med nodemon server.js (servern refreshar automatiskt vid ändringar/tillägg)

- Servern är nu uppe

**Client**
(Fortfarande kvar i projektet via Visual Studio Code)
- Öppna en till Terminal (se stegen ovan eller klicka på + i Terminalens meny)

- Navigera till client-mappen genom kommandot:
        cd client

- Kör kommandot:
        npm install
(För att få tillgång till node_moduels med alla dependencies som krävs för client)

- Kör kommandot:
        npm run dev

- Projektet är nu igång och du kan se applikationen i din webbläsare via http://localhost:(nummer)/

**Gif (Giphy)**
I denna appliktion finns det möjlighet att skriva /gif i meddelanderutan för att skicka en slumpmässig gif.
Vi har använt oss av Giphy till detta för att få ut en egen API-nyckel.
För att få tillgång till en API-nyckel behöver du antingen logga in till redan befintligt konto på Giphy eller skapa ett nytt. Det finns kostnadsfria alternativ.

https://giphy.com/

Om du inte har ett konto sedan tidigare:
- Klicka på Log In längst upp till höger
- Välj Sign up och fyll i dina uppgifter, följ sedan instruktionerna på skärmen

När konto finns loggar du in

- Navigera till https://developers.giphy.com/docs/api/
- Gå till Dashboard genom att klickapå ditt användarnamn uppe till höger och välja Dashboard i menyn
- Create an App
- SDK-> Next
- Namnge din App och skriv en kort beskrivning  -> Create
- Du får din API-nyckel. Kopiera den

(Har du redan en API-nyckel för gif hos Giphy så når du den genom att navigera till Dashboard.) //FRÅGA OM DET ÄR SÅ!!

- Skapa en .env fil i client-mappen.
- Kontrollera att .env filen finns med i gitIgnore filen.
- I .env skriver du VITE_API_KEY = och klistrar sedan in din API-nyckel efter = 
- Spara och det ska nu gå att skicka en slumpmässig gif i denna applikation.







