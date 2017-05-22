import {AfterViewInit, Component} from '@angular/core';
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/foldgutter';
import {TAGS} from '../schema/music-xml';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  config: any;

  code: any;

  constructor() {
    this.config = {
      lineNumbers: true,
      mode: 'xml',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: {
        '\'<\'': completeAfter,
        '\'/\'': completeIfAfterLt,
        '\' \'': completeIfInTag,
        '\'=\'': completeIfInTag,
        'Ctrl-Space': 'autocomplete',
        'Ctrl-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        }
      },
      hintOptions: {
        schemaInfo: TAGS
      }
    };
  }

  ngAfterViewInit(): void {
    const instance = CodeMirror.fromTextArea(document.getElementById('mirror'), this.config);
    console.log('instance: ', instance);
    instance.on('change', () => {
      console.log('value: ', instance.getValue());
      this.code = instance.getValue();
    });
  }
}

function completeAfter(cm, pred) {
  // var cur = cm.getCursor();
  if (!pred || pred()) {
    setTimeout(function () {
      if (!cm.state.completionActive) {
        cm.showHint({completeSingle: false});
      }
    }, 100);
  }
  return CodeMirror.Pass;
}

function completeIfAfterLt(cm) {
  return completeAfter(cm, function () {
    const cur = cm.getCursor();
    return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) === '<';
  });
}

function completeIfInTag(cm) {
  return completeAfter(cm, function () {
    const tok = cm.getTokenAt(cm.getCursor());
    if (tok.type === 'string' && (!/['']/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)) {
      return false;
    }
    const inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
    return inner.tagName;
  });
}
