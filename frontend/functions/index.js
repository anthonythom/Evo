const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.novaFuncao = functions.firestore.document('suaColecao/{docId}')
  .onCreate((snapshot, context) => {
    const data = snapshot.data(); // Dados do novo documento criado
    console.log('Novo item criado:', data);

    // Você pode executar ações personalizadas aqui, como enviar notificações, enviar e-mails, etc.

    return null;
  });
