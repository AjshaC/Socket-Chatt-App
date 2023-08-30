# Socket-Chatt-App: Chat at eleven

# Beskrivning: 
Vi har skapat en chatt-applikation med namn Chat at eleven där användare kan chatta med varandra i realtid. 

Servern är byggd med socket.io samt nodeJS / express.

För client är projketet byggt med React och TypeScript. När det gäller design valde vi att använda oss av antDesign i kombination med egen CSS för att få ut önskad layout av applikationen. Applikationen är byggd för att passa desktop.

I applikationen visas en startskärm där användaren fyller i önskat username och klickar sedan på Join. Chatten startas och användaren hamnar automatiskt i Lobbyn.
Användaren kan chatta med andra användare i aktuellt rum, skapa ett nytt rum eller gå med i ett redan befintligt rum som finns i listan.
För varje rum så finns en lista över vilka användare som är inloggade i just det rummet.
Lobby kommer alltid finnas kvar, alla andra rum raderas automatiskt om det inte finns någon användare i dom.


# Installation
För att få igång detta projekt gör du följande:

- Börja med att se till att ha NodeJS installerat. Börja annars med att installera det enligt NodeJS dokumentation https://nodejs.org/en

- Kopiera sedan repot från GitHub https://github.com/AjshaC/Socket-Chatt-App.git

- Klona ner repot på din dator med följande kommando i Terminalen. Navigera först till den mapp där du vill spara projektet:  

        git clone https://github.com/AjshaC/Socket-Chatt-App.git

- Öppna upp projektet i editor Visual Studio Code för att direkt härifrån nå Terminalen.


**Server**

- Öppna en Terminal
  
- Navigera till server-mappen genom kommandot: 
        cd server

- Kör kommandot:
        npm install

- Starta sedan servern genom något av följande kommandon:
  
        npm start för att dra igång servern mot node server.js

                eller: 

        npm run dev för att köra med nodemon server.js

- Servern är nu igång

**Client**

- Öppna en till Terminal

- Navigera till client-mappen genom kommandot:
        cd client

- Kör kommandot:
        npm install

- När installationen är klar, kör kommandot:
        npm run dev

Projektet är nu uppe och snurrar och du kan se applikationen i din webbläsare
