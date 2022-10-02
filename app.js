const flags = {
    uppercase: false,
    numbers: false,
    symbols: false,
    length: 5
}

const selectors = {
    copy: 'copy',
    checkbox: 'checkbox',
    slider: 'slider',
    button: 'button',
    sliderValue: document.querySelector('.value'),
    input: document.querySelector('input[type="text"]')
}

const generatePassword = () => {
    const defaultCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const characters = {
        uppercase: defaultCharacters.toUpperCase(),
        numbers: '0123456789',
        symbols: '~!@#$%¨&*()'
    }

    const characterList = [
        defaultCharacters,
        ...flags.uppercase ? characters.uppercase : [],
        ...flags.numbers ? characters.numbers : [],
        ...flags.symbols ? characters.symbols : [],
    ].join('')

    return Array.from({ length: flags.length }, () => Math.floor(Math.random() * characterList.length))
        .map(number => characterList[number])
        .join('')
}

document.querySelector('#app').addEventListener('click', event => {
    switch (event.target.dataset.jsSelector) {
        //event listener for copy
        case selectors.copy:
            selectors.input.select()

            document.execCommand('copy')
            break;

        //event listener for checkboxes
        case selectors.checkbox:
            flags[event.target.control.id] = !event.target.control.checked
            break;

        //event listener for slider
        case selectors.slider:
            const value = event.target.valueAsNumber

            selectors.sliderValue.innerText = value
            flags.length = value
            break;

        //event listener for generate button
        case selectors.button:
            selectors.input.value = generatePassword()
            break;
    }
})



