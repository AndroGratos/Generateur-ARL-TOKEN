const _0x3e9ed3=_0x5ecb;function _0x5ecb(_0xfef74f,_0x1f11b7){const _0x54ac55=_0x54ac();return _0x5ecb=function(_0x5ecbcb,_0x4d06ed){_0x5ecbcb=_0x5ecbcb-0xdb;let _0x5fb822=_0x54ac55[_0x5ecbcb];return _0x5fb822;},_0x5ecb(_0xfef74f,_0x1f11b7);}function _0x54ac(){const _0x4128e0=['preventDefault','Erreur\x20de\x20connexion:','location','password','102ZlESBt','553887eEuyRh','Connexion\x20Ã©chouÃ©e:\x20','generateurtoken-e282f.appspot.com','user','email','users','116916XtJjbo','25904ocYHal','485438236563','387HzgVtp','104XmLEyl','Un\x20e-mail\x20de\x20vÃ©rification\x20a\x20Ã©tÃ©\x20envoyÃ©.\x20Veuillez\x20vÃ©rifier\x20votre\x20boÃ®te\x20de\x20rÃ©ception.','Identifiant\x20incorrect.','login.html','loginButton','resetEmail','/index.html','logoutButton','empty','text','type','8UMaFjp','index.html','2923388yYXXKq','catch','197770GmBlKm','value','data','error','/signup.html','generateurtoken-e282f','pathname','Email\x20de\x20rÃ©initialisation\x20envoyÃ©\x20!','identifier','generateurtoken-e282f.firebaseapp.com','togglePassword','emailVerified','signupEmail','406133wircqa','15580nlXxzR','textContent','signupButton','253HMXlfm','Veuillez\x20vÃ©rifier\x20votre\x20adresse\x20e-mail\x20pour\x20vous\x20connecter.','exists','resetButton','href','addEventListener','CrÃ©ation\x20de\x20compte\x20Ã©chouÃ©e:\x20','Erreur\x20d\x27envoi\x20de\x20l\x27email\x20de\x20rÃ©initialisation:\x20','message','12EwYChb','1:485438236563:web:a587b79c5d4bb26edeea66','AIzaSyD2MzAcFOGELXdRwdK-C1Mczm2quyV-HZs','getElementById','click','Erreur\x20d\x27envoi\x20de\x20l\x27email\x20de\x20rÃ©initialisation:','toggleSignupPassword'];_0x54ac=function(){return _0x4128e0;};return _0x54ac();}(function(_0x45e783,_0x584529){const _0x58fd94=_0x5ecb,_0x133dbf=_0x45e783();while(!![]){try{const _0x2b0f89=parseInt(_0x58fd94(0xe8))/0x1*(parseInt(_0x58fd94(0xf6))/0x2)+parseInt(_0x58fd94(0xe1))/0x3*(-parseInt(_0x58fd94(0x114))/0x4)+-parseInt(_0x58fd94(0x108))/0x5*(parseInt(_0x58fd94(0xe0))/0x6)+-parseInt(_0x58fd94(0x107))/0x7*(-parseInt(_0x58fd94(0xeb))/0x8)+-parseInt(_0x58fd94(0xea))/0x9*(-parseInt(_0x58fd94(0xfa))/0xa)+-parseInt(_0x58fd94(0x10b))/0xb*(parseInt(_0x58fd94(0xe7))/0xc)+-parseInt(_0x58fd94(0xf8))/0xd;if(_0x2b0f89===_0x584529)break;else _0x133dbf['push'](_0x133dbf['shift']());}catch(_0x51d797){_0x133dbf['push'](_0x133dbf['shift']());}}}(_0x54ac,0x9f4a2));import{initializeApp}from'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';import{getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,sendPasswordResetEmail,sendEmailVerification}from'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';import{getFirestore,doc,setDoc,getDoc,collection,query,where,getDocs}from'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';const firebaseConfig={'apiKey':_0x3e9ed3(0x116),'authDomain':_0x3e9ed3(0x103),'projectId':_0x3e9ed3(0xff),'storageBucket':_0x3e9ed3(0xe3),'messagingSenderId':_0x3e9ed3(0xe9),'appId':_0x3e9ed3(0x115)},app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);document[_0x3e9ed3(0x117)](_0x3e9ed3(0x10a))?.['addEventListener']('click',async _0x42d66c=>{const _0x1158b8=_0x3e9ed3;_0x42d66c[_0x1158b8(0xdc)]();const _0x30db5e=document[_0x1158b8(0x117)]('signupIdentifier')['value'],_0x21b50e=document[_0x1158b8(0x117)](_0x1158b8(0x106))[_0x1158b8(0xfb)],_0x596171=document['getElementById']('signupPassword')[_0x1158b8(0xfb)];try{const _0x36de49=await createUserWithEmailAndPassword(auth,_0x21b50e,_0x596171),_0x29b77b=_0x36de49[_0x1158b8(0xe4)];await sendEmailVerification(_0x29b77b),alert(_0x1158b8(0xec)),await setDoc(doc(db,_0x1158b8(0xe6),_0x29b77b['uid']),{'identifier':_0x30db5e,'email':_0x21b50e,'role':_0x1158b8(0xe4),'clickLeft':0x5,'resetTime':null}),window[_0x1158b8(0xde)][_0x1158b8(0x10f)]=_0x1158b8(0xee);}catch(_0x33ea2e){console[_0x1158b8(0xfd)]('Erreur\x20de\x20crÃ©ation\x20de\x20compte:',_0x33ea2e['message']),alert(_0x1158b8(0x111)+_0x33ea2e['message']);}}),document[_0x3e9ed3(0x117)](_0x3e9ed3(0xef))?.['addEventListener'](_0x3e9ed3(0x118),async _0x29dcc7=>{const _0x3b6e59=_0x3e9ed3;_0x29dcc7['preventDefault']();const _0x173091=document[_0x3b6e59(0x117)](_0x3b6e59(0x102))[_0x3b6e59(0xfb)],_0x454a03=document[_0x3b6e59(0x117)](_0x3b6e59(0xdf))[_0x3b6e59(0xfb)];try{const _0x5711e5=collection(db,'users'),_0x386d0b=query(_0x5711e5,where('identifier','==',_0x173091)),_0x50f1e0=await getDocs(_0x386d0b);if(_0x50f1e0[_0x3b6e59(0xf3)])throw new Error(_0x3b6e59(0xed));const _0x4faffd=_0x50f1e0['docs'][0x0][_0x3b6e59(0xfc)](),_0x1563e2=_0x4faffd[_0x3b6e59(0xe5)],_0x2afe0d=await signInWithEmailAndPassword(auth,_0x1563e2,_0x454a03),_0x2a78ec=_0x2afe0d[_0x3b6e59(0xe4)];_0x2a78ec[_0x3b6e59(0x105)]?window[_0x3b6e59(0xde)][_0x3b6e59(0x10f)]='index.html':(alert(_0x3b6e59(0x10c)),window[_0x3b6e59(0xde)][_0x3b6e59(0x10f)]=_0x3b6e59(0xee));}catch(_0x5af9df){console[_0x3b6e59(0xfd)](_0x3b6e59(0xdd),_0x5af9df[_0x3b6e59(0x113)]),alert(_0x3b6e59(0xe2)+_0x5af9df[_0x3b6e59(0x113)]);}}),document[_0x3e9ed3(0x117)](_0x3e9ed3(0xf2))?.['addEventListener'](_0x3e9ed3(0x118),()=>{const _0x28f7a4=_0x3e9ed3;signOut(auth)['then'](()=>{const _0x1957c4=_0x5ecb;window[_0x1957c4(0xde)]['href']=_0x1957c4(0xee);})[_0x28f7a4(0xf9)](_0x5e856a=>{const _0x4c17a3=_0x28f7a4;console[_0x4c17a3(0xfd)]('Erreur\x20de\x20dÃ©connexion:',_0x5e856a['message']);});}),document[_0x3e9ed3(0x117)](_0x3e9ed3(0x10e))?.[_0x3e9ed3(0x110)](_0x3e9ed3(0x118),async _0x5a0bd5=>{const _0x18ba44=_0x3e9ed3;_0x5a0bd5[_0x18ba44(0xdc)]();const _0x328f80=document['getElementById'](_0x18ba44(0xf0))[_0x18ba44(0xfb)];try{await sendPasswordResetEmail(auth,_0x328f80),alert(_0x18ba44(0x101));}catch(_0x13a46f){console[_0x18ba44(0xfd)](_0x18ba44(0x119),_0x13a46f[_0x18ba44(0x113)]),alert(_0x18ba44(0x112)+_0x13a46f[_0x18ba44(0x113)]);}}),document['getElementById']('togglePassword')?.[_0x3e9ed3(0x110)](_0x3e9ed3(0x118),()=>{const _0x90559d=_0x3e9ed3,_0x585e28=document[_0x90559d(0x117)]('password'),_0x40d542=document['getElementById'](_0x90559d(0x104));_0x585e28[_0x90559d(0xf5)]==='password'?(_0x585e28[_0x90559d(0xf5)]='text',_0x40d542[_0x90559d(0x109)]='ðŸµ'):(_0x585e28[_0x90559d(0xf5)]='password',_0x40d542[_0x90559d(0x109)]='ðŸ™ˆ');}),document['getElementById'](_0x3e9ed3(0xdb))?.[_0x3e9ed3(0x110)](_0x3e9ed3(0x118),()=>{const _0x478181=_0x3e9ed3,_0x295548=document[_0x478181(0x117)]('signupPassword'),_0x57f4bf=document[_0x478181(0x117)]('toggleSignupPassword');_0x295548['type']===_0x478181(0xdf)?(_0x295548[_0x478181(0xf5)]=_0x478181(0xf4),_0x57f4bf[_0x478181(0x109)]='ðŸµ'):(_0x295548['type']=_0x478181(0xdf),_0x57f4bf[_0x478181(0x109)]='ðŸ™ˆ');}),onAuthStateChanged(auth,async _0x5f0ad9=>{const _0x231878=_0x3e9ed3;if(_0x5f0ad9){const _0x135a05=doc(db,_0x231878(0xe6),_0x5f0ad9['uid']),_0x4fe019=await getDoc(_0x135a05);if(_0x4fe019[_0x231878(0x10d)]()){const _0x235269=_0x5f0ad9[_0x231878(0x105)];if(window[_0x231878(0xde)][_0x231878(0x100)]===_0x231878(0xf1))!_0x235269&&(window[_0x231878(0xde)][_0x231878(0x10f)]=_0x231878(0xee));else(window[_0x231878(0xde)][_0x231878(0x100)]==='/login.html'||window['location'][_0x231878(0x100)]===_0x231878(0xfe)||window[_0x231878(0xde)][_0x231878(0x100)]==='/password-reset.html')&&(_0x235269&&(window[_0x231878(0xde)]['href']=_0x231878(0xf7)));}}else window[_0x231878(0xde)][_0x231878(0x100)]===_0x231878(0xf1)&&(window[_0x231878(0xde)]['href']=_0x231878(0xee));});
