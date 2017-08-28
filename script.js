(function() {
    var output = document.getElementById("data");
    var config = {
      apiKey: "AIzaSyDesoNIuzgEXxJEOwUpSMPLUO2Fjro08qE",
       authDomain: "banheiro-94baa.firebaseapp.com",
       databaseURL: "https://banheiro-94baa.firebaseio.com",
       projectId: "banheiro-94baa",
       storageBucket: "banheiro-94baa.appspot.com",
       messagingSenderId: "38919902712"
    };
    firebase.initializeApp(config);
    var ref = firebase.database().ref();
    ref.on("value", function(snapshot) {
        output.innerHTML = JSON.stringify(snapshot.val(), null, 2);
    });

    const preObject = firebase.database().ref().child('msg');
    const ulList = document.getElementById('list');

    const dbRefObject = firebase.database().ref().child('msg');
    const dbRefList = dbRefObject.child('respostas');
    const tempo = dbRefList.child('data');

    dbRefObject.on('value', snap => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

    tempo.on('value', snap => {
      document.getElementById("since").innerHTML = new Date(snap.val());
    });

    dbRefList.on('child_added', snap => {
      const li = document.createElement('li');
      li.innerText = snap.val();
      li.id = snap.key;
      li.class = snap.key;

        ulList.appendChild(li);
    });



    dbRefList.on('child_removed', snap => {
      const liToRemove = document.getElementById(snap.key);
      liToRemove.remove();
    });

    $(function () {
        $('ul').on('click', '#nao', function () {
          var newStoreRef2 = dbRefList.push();
            dbRefList.set({
              sim: "SIM",
              data: firebase.database.ServerValue.TIMESTAMP
            });

            document.getElementById("since").innerHTML = tempo;
             alert("Bom saber!!! \n\nO status foi modificado na nuvem. \n\nObrigado por usar o Smell Check!");

       });

    });

    $(function () {
      $('ul').on('click', '#sim', function () {
        var newStoreRef2 = dbRefList.push();
          dbRefList.set({
            nao: "NÃO",
            data: firebase.database.ServerValue.TIMESTAMP
          });

          document.getElementById("since").innerHTML = tempo;
          alert("Bom saber!!! \n\nO status foi modificado na nuvem. \n\nObrigado por usar o Smell Check!");



});

       });

}());
