// Fetch the data from books.json
fetch('/pages/json/books.json')
    .then(response => response.json())
    .then(data => {
        const tableContent = document.getElementById('tableContent');
        tableContent.innerHTML = ''; // Clear any existing content

        // Get the current date
        const currentDate = new Date();

        // Loop through the JSON data and create table rows dynamically
        data.forEach(book => {
            const bookDate = new Date(book.date);
            
            // Calculate the number of 7-day periods since the book's publish date
            const timeDifference = currentDate - bookDate;
            const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Days passed since the book was added
            const weeksSince = Math.floor(daysSince / 7); // Number of 7-day periods that have passed

            // Initial view count, assuming the book has at least 32 views when first added
            let views = 32;

            // Increase views by a random number between 1 and 7 for each 7-day period
            views += weeksSince * (Math.floor(Math.random() * 7) + 1);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="date">${book.date}</td>
                <td class="title">
                    <a href="${book.link}" target="_blank">${book.title}</a>
                </td>
                <td class="views">${views}</td>
            `;
            tableContent.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error loading books data:', error);
    });

