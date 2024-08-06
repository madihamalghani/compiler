const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const previewFrame = document.getElementById('previewFrame');

//displaying html editor as default:
htmlEditor.style.display = 'block';
cssEditor.style.display = 'none';
jsEditor.style.display = 'none';


document.getElementById('html').addEventListener('click', () => {
    toggleEditor(htmlEditor, cssEditor, jsEditor);
});

document.getElementById('css').addEventListener('click', () => {
    toggleEditor(cssEditor, htmlEditor, jsEditor);
});

document.getElementById('js').addEventListener('click', () => {
    toggleEditor(jsEditor, htmlEditor, cssEditor);
});

function toggleEditor(activeEditor, editor1, editor2) {
    
   if (activeEditor.style.display === 'none' || activeEditor.style.display === '') {
        activeEditor.style.display = 'block';
        editor1.style.display = 'none';
        editor2.style.display = 'none';
    } else {
        activeEditor.style.display = 'happy coding';
    }
}

document.getElementById('runCode').addEventListener('click', updatePreview);

function updatePreview() {
    const htmlContent = htmlEditor.value;
    const cssContent = `<style>${cssEditor.value}</style>`;//compile css by loading <style>
    const jsContent = `<script>${jsEditor.value}<\/script>`;//compile script
    const previewContent = `${htmlContent}\n${cssContent}\n${jsContent}`;//combining the whole code

    const iframeDocument = previewFrame.contentDocument;//like opening a blank page
    iframeDocument.open();//opening that blank page
    iframeDocument.write(previewContent);//write the combining code
    iframeDocument.close();
}

// local storage
function saveCode() {
    localStorage.setItem('htmlCode', htmlEditor.value);
    localStorage.setItem('cssCode', cssEditor.value);
    localStorage.setItem('jsCode', jsEditor.value);
}

// Load code from localStorage
function loadCode() {
    htmlEditor.value = localStorage.getItem('htmlCode') || '';
    cssEditor.value = localStorage.getItem('cssCode') || '';
    jsEditor.value = localStorage.getItem('jsCode') || '';
  
}

window.addEventListener('load', loadCode);
window.addEventListener('beforeunload', saveCode);