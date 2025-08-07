const allContent = {
    // Your projects data
    "project1": {
        title: "3-Statement Financial Model for a Tech Company",
        image: "https://placehold.co/800x450/e0e0e0/555555?text=3-Statement+Model",
        tags: ["Financial Modeling", "Excel"],
        description: "A comprehensive financial model built from scratch, forecasting the income statement, balance sheet, and cash flow statement for a publicly traded technology company. This project demonstrates proficiency in financial statement analysis and forecasting principles."
    },
    "project2": {
        title: "Discounted Cash Flow (DCF) Valuation",
        image: "https://placehold.co/800x450/e0e0e0/555555?text=DCF+Valuation",
        tags: ["Valuation", "Python"],
        description: "This project involves a detailed valuation of a public company using a Python-based DCF model. It includes calculating the Weighted Average Cost of Capital (WACC), forecasting future cash flows, and performing sensitivity analysis."
    },
    "project3": {
        title: "S&P 500 Stock Analysis Dashboard",
        image: "https://placehold.co/800x450/e0e0e0/555555?text=Dashboard+Analysis",
        tags: ["Data Analysis", "Tableau"],
        description: "An interactive dashboard developed using Tableau to visualize and analyze the performance of companies in the S&P 500. The dashboard provides insights into key financial metrics, stock performance, and industry trends."
    },
    // Your learning journey data
    "learning1": {
        title: "Financial Modeling & Valuation Analyst (FMVA)",
        image: "https://placehold.co/800x450/d1d5db/4b5563?text=FMVA+Certificate",
        tags: ["Certification", "CFI"],
        description: "I completed the Financial Modeling & Valuation Analyst (FMVA) certification from the Corporate Finance Institute (CFI). This rigorous program provided me with practical, hands-on experience in financial modeling, valuation, and Excel best practices."
    },
    "learning2": {
        title: "Excel for Finance Crash Course",
        image: "https://placehold.co/800x450/d1d5db/4b5563?text=Excel+Course",
        tags: ["Course", "Excel"],
        description: "A foundational course focused on mastering advanced Excel functions, keyboard shortcuts, and best practices essential for efficient financial analysis and robust model building."
    },
    "learning3": {
        title: "Introduction to Python for Data Analysis",
        image: "https://placehold.co/800x450/d1d5db/4b5563?text=Python+Course",
        tags: ["Skill", "Python"],
        description: "An introductory course on using Python for financial data analysis. I learned to use libraries such as Pandas for data manipulation, Matplotlib for visualization, and NumPy for numerical operations."
    }
};

async function generateProjectDescription(projectTitle) {
    const prompt = `Generate a professional and detailed description for a financial project titled "${projectTitle}". Structure the response with clear headings for "Purpose," "Methodology," and "Outcomes." The content should be in Markdown.`;
    document.getElementById('generate-llm-btn').textContent = 'Generating...';
    document.getElementById('generate-llm-btn').disabled = true;
    document.getElementById('item-llm-description').innerHTML = `<p class="text-center text-gray-500">Generating detailed description...</p>`;
    
    try {
        const apiKey = ""
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
            const formattedText = text.replace(/###\s(.*?)\n/g, '<h4 class="text-xl font-semibold mt-4 mb-2">$1</h4>');
            document.getElementById('item-llm-description').innerHTML = formattedText;
        } else {
            document.getElementById('item-llm-description').innerHTML = `<p class="text-center text-red-500">Could not generate a description. Please try again later.</p>`;
        }
    } catch (error) {
        console.error('API call failed:', error);
        document.getElementById('item-llm-description').innerHTML = `<p class="text-center text-red-500">An error occurred: ${error.message}</p>`;
    } finally {
        document.getElementById('generate-llm-btn').textContent = 'Generate Detailed Description ✨';
        document.getElementById('generate-llm-btn').disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const itemData = allContent[itemId];

    if (itemData) {
        document.getElementById('item-title').textContent = itemData.title;
        document.getElementById('item-image').src = itemData.image;
        document.getElementById('item-description').textContent = itemData.description;
        document.title = `${itemData.title} | Portfolio`;

        const tagsContainer = document.getElementById('item-tags');
        tagsContainer.innerHTML = itemData.tags.map(tag =>
            `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">${tag}</span>`
        ).join('');

        const generateBtn = document.getElementById('generate-llm-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                generateProjectDescription(itemData.title);
            });
        }
    } else {
        document.getElementById('content-container').innerHTML = `<p class="text-center text-red-500 text-xl">Content not found.</p>`;
        const generateBtn = document.getElementById('generate-llm-btn');
        if (generateBtn) {
            generateBtn.style.display = 'none';
        }
        document.title = 'Not Found | Portfolio';
    }
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    menuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); });
    });
});
