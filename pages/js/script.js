fetch('/pages/json/books.json')
    .then(response => response.json())
    .then(async data => {
        const tableContent = document.getElementById('tableContent');
        tableContent.innerHTML = ''; // Clear any existing content

        // Create an array to store books with their last modified dates
        const booksWithLastModified = await Promise.all(
            data.map(async book => {
                try {
                    // Make a HEAD request to fetch the Last-Modified header
                    const response = await fetch(book.link, { method: 'HEAD' });
                    const lastModified = response.headers.get('Last-Modified');
                    const lastModifiedDate = lastModified ? new Date(lastModified) : new Date(book.date); // Use book.date if Last-Modified not available
                    return { ...book, date: lastModifiedDate };
                } catch (error) {
                    console.error(`Error fetching Last-Modified for ${book.link}:`, error);
                    return { ...book, date: new Date(book.date) }; // Default to book.date if fetch fails
                }
            })
        );

        // Sort books by the updated date in descending order
        booksWithLastModified.sort((a, b) => b.date - a.date);

        // Get the current date
        const currentDate = new Date();

        // Get the most recently modified book
        const latestBook = booksWithLastModified[0];
        const latestBookDate = new Date(latestBook.date);

        // Create a row for the most recently modified book date at the top of the list
        const topRow = document.createElement('tr');
        topRow.innerHTML = `
            <td class="date" colspan="3">Last Modified: ${latestBookDate.toISOString().split('T')[0]}</td>
        `;
        tableContent.appendChild(topRow); // Add it at the top of the table

        // Loop through the sorted data and create table rows dynamically
        booksWithLastModified.forEach(book => {
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
                <td class="date">${bookDate.toISOString().split('T')[0]}</td>
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
