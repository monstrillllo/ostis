ExampleComponent = {
    ext_lang: 'example_code',
    formats: ['format_example'],
    struct_support: true,

    factory: function (sandbox) {
        return new ExampleWindow(sandbox);
    }
};

ExampleWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_example_text_component', 'ui_example_search_component', 'ui_example_answer_button',
    'ui_example_info_block'];
    const textComponent = '#example-' + sandbox.container + " #text-component";
    const searchComponent = '#example-' + sandbox.container + " #search-component";
    const answerButton = '#example-' + sandbox.container + " #answer-button";
    const keyword = '#example-' + sandbox.container + " #keyword";
    const infoBlock = '#example-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="example-' + sandbox.container + '"></div>');

    $('#example-' + sandbox.container).load('static/components/html/example.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
		makeFileText();

          });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_example_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_example_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_example_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_example_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });

	
    }

   function makeFileText() {
	
	var first_name = document.querySelector("#first_name");
	var second_name = document.querySelector("#second_name");
	var nickname = document.querySelector("#nickname");
	var birthday = document.querySelector("#birthday");
	var popular = document.querySelector("#popular");

	let radios1 = document.querySelectorAll('input[name="type"]');	
	let radios2 = document.querySelectorAll('input[name="genre"]');

	var text =  'concept_'+ nickname.value + '\n\n';
	text += '=> nrel_main_idtf: ['+ first_name.value +' '+ second_name.value +'] (* <- lang_ru;; *);\n'
	text += '<= nrel_inclusion: concept_musician_';
	for (let radio of radios1) {
		if (radio.checked) {
			text+= radio.value + ';\n';
		}
	}
	text += '\n'
    text += '<= nrel_inclusion: concept_genre_';
	for (let radio of radios2) {
		if (radio.checked) {
			text+= radio.value + ';\n';
		}
	}

	text += '=> nrel_birthday: [Дата рождения: '+ birthday.value +'] (* <- lang_ru;; *);\n'
    text += '=> nrel_most_popular_track: [Самое популярное произведение: '+ popular.value +'] (* <- lang_ru;; *);\n\n'

    text += '<- sc_node_not_relation;;';


	var file = nickname.value + '.scs';
	download(file, text); 

	}

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

SCWeb.core.ComponentManager.appendComponentInitialize(ExampleComponent);
