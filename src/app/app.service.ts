import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }


  loadScriptPage(dynamicScripts) {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }
    if (!isFound) {
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementById('scripts_page').appendChild(node);
        document.getElementById('scripts_page').appendChild(node);
        document.getElementById('scripts_page').appendChild(node);
        document.getElementById('scripts_page').appendChild(node);
      }
    }
  }

}
