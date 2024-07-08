// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
// var chatbotScript = `<script src="//unity-plugin.iamdave.ai/conversation-plugin/build/2.0/dave-libs.js" id="dave-settings" data-environment="staging" data-asserts="//unity-plugin.iamdave.ai/conversation-plugin" data-loadfunction='onload' data-component="babylon-avatar-conversation,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.js,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.css"></script>`

// const chatbotDiv = document.createElement('div');
// chatbotDiv.innerHTML = chatbotScript;

const chatDiv = document.createElement('div');
chatDiv.innerHTML = `<div class="dave-main-container" id="dave-settings" data-dave-components="chatbot-speech-avatar-wjq-help,maruti_accessories/2.0/arena.js" data-app-version="2.0" data-dave-version="9.1"></div><div class="dave-help-container" id="dave-help" data-timeout=15000></div>`

var chatScript = document.createElement('script');
chatScript.src = "//unity-plugin.iamdave.ai/conversation-plugin/build/2.0/dave-libs.js";
// chatScript.src = "//chatbot-plugin.iamdave.ai/assets/js/9.1/library-loader.js";
chatScript.id = "dave-settings";
chatScript.setAttribute("data-environment","staging");
chatScript.setAttribute("data-loadfunction","onload");
chatScript.setAttribute("data-component","babylon-avatar-conversation,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.js,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.css")
chatScript.setAttribute("data-asserts","//unity-plugin.iamdave.ai/conversation-plugin");
chatScript.type = "text/javascript";

const bodyTag = document.getElementsByTagName('body')[0];

if(window.location.pathname === '/us/en/chatbot') {
    bodyTag.appendChild(chatDiv);
    bodyTag.appendChild(chatScript);
    document.getElementsByTagName('body')[0].appendChild(chatScript);
}

