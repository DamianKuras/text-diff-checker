import Diff from 'diff';

const showWarning = (message) => {
    const warning = document.getElementById('warningMessage');
    warning.textContent = message;
    warning.classList.add('show');
};

const hideWarning = () => {
    const warning = document.getElementById('warningMessage');
    warning.classList.remove('show');
};

const renderDiffLines = (patch, container) => {
    const lines = patch.split('\n');
    container.innerHTML = '';
    lines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'diff-line';

        if (line.startsWith('@@')) {
            lineDiv.classList.add('meta');
        } else if (line.startsWith('+')) {
            lineDiv.classList.add('add');
        } else if (line.startsWith('-')) {
            lineDiv.classList.add('sub');
        } else if (line.startsWith('---') || line.startsWith('+++')) {
            lineDiv.classList.add('meta');
        }

        lineDiv.textContent = line;
        container.appendChild(lineDiv);
    });
};

const initializeDiffChecker = () => {
    const form = document.getElementById('diffForm');
    const diffOutput = document.getElementById('diffOutput');
    const originalTextarea = document.getElementById('originalText');
    const modifiedTextarea = document.getElementById('modifiedText');

    const handleDiffUpdate = (event) => {
        event.preventDefault();
        const originalText = originalTextarea.value;
        const modifiedText = modifiedTextarea.value;

        // Clear previous warnings
        hideWarning();

        // Validation check
        if (!originalText && !modifiedText) {
            showWarning('Both text areas are empty! Please enter text to compare.');
            return;
        }

        if (!originalText) {
            showWarning('Original text area is empty. Showing full addition.');
        }

        if (!modifiedText) {
            showWarning('Modified text area is empty. Showing full removal.');
        }

        // Display patch diff
        const patch = Diff.createTwoFilesPatch('Original', 'Modified', originalText, modifiedText);
        renderDiffLines(patch, diffOutput)
    };

    diffButton.addEventListener('click', handleDiffUpdate);
}

document.addEventListener('DOMContentLoaded', initializeDiffChecker);
