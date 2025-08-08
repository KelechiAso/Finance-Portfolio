document.addEventListener('DOMContentLoaded', () => {
    const notebookContainer = document.getElementById('notebook-content');
    const urlParams = new URLSearchParams(window.location.search);
    const notebookFileName = urlParams.get('notebook');

    // Function to extract and combine styles from the notebook HTML
    function extractAndApplyStyles(doc) {
        let styleContent = '';
        // Extract all <style> tags
        doc.querySelectorAll('style').forEach(styleTag => {
            styleContent += styleTag.textContent;
        });
        // Extract all <link> tags for stylesheets
        doc.querySelectorAll('link[rel="stylesheet"]').forEach(linkTag => {
            // In a real-world scenario, you might need to fetch and combine these
            // For a simple case, we'll assume they are relative and valid.
            // This is a placeholder for a more robust solution if needed.
            styleContent += `@import url(${linkTag.href});\n`;
        });
        
        // Create a new style tag for the page and append it
        const styleTag = document.createElement('style');
        styleTag.textContent = styleContent;
        document.head.appendChild(styleTag);
    }

    if (notebookFileName) {
        const filePath = `assets/projects/${notebookFileName}.html`;

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load: ${filePath}`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract and apply the notebook's original styles first
                extractAndApplyStyles(doc);

                const notebookTitle = doc.querySelector('h1')?.textContent || notebookFileName;
                document.title = `${notebookTitle} | Portfolio`;
                document.getElementById('page-title').textContent = notebookTitle;
                
                // Inject only the body content of the notebook
                notebookContainer.innerHTML = doc.body.innerHTML;
            })
            .catch(error => {
                console.error(error);
                notebookContainer.innerHTML = `
                    <div class="text-center text-red-500 text-xl">
                        <p>Error loading notebook: ${error.message}</p>
                        <button onclick="window.history.back()" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors mt-8">
                            &larr; Go Back
                        </button>
                    </div>
                `;
            });
    } else {
        notebookContainer.innerHTML = `
            <div class="text-center text-red-500 text-xl">
                <p>No notebook specified in the URL.</p>
                <button onclick="window.history.back()" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors mt-8">
                    &larr; Go Back
                </button>
            </div>
        `;
        document.title = 'Error | Portfolio';
    }
});
