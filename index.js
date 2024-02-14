
const http = require('http');
const fs = require('fs');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();

const server = http.createServer((req, res) => {
    // Task #1: Multi-route http server
    const { url, method } = req;
let filePath = "./views/";
    switch (url) {
        case '/home':
            //handleHomePage(req, res);
            filePath += 'home.html';
            readHtmlFile(filePath, res)
            break;
        case '/about':
            // handleAboutPage(req, res);
            filePath += 'about.html';
            readHtmlFile(filePath, res)
            break;
        case '/contact':
            // handleContactPage(req, res);
            filePath += 'contact.html';
            readHtmlFile(filePath, res)
            break;
        case '/products':
            // handleProductsPage(req, res);
            filePath += 'products.html';
            readHtmlFile(filePath, res)
            break;
        case '/subscribe':
            // handleSubscribePage(req, res);
            filePath += 'subscribe.html';
            readHtmlFile(filePath, res)
            break;
        default:
            handleNotFoundPage(req, res);
            break;
    }



    // Task #3: Identify events and write to console and logs
    // For example, log access events
    const statusCode = 200; // Change this based on your logic
    const accessMessage = `${method} ${url}`;
    logAccess(statusCode, accessMessage);

    // Example: Log to error file for a 404 Not Found
    logError('[404] Not Found: ' + req.url);

   
});

// const handleHomePage = (req, res) => {
//     // Handle the root route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Welcome to the Home Page</h1>');
//     res.end();
// };

// const handleAboutPage = (req, res) => {
//     // Handle the /about route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>About Us</h1><p>Learn more about our amazing company!</p>');
//     res.end();
// };

// const handleContactPage = (req, res) => {
//     // Handle the /contact route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Contact Us</h1><p>Feel free to reach out to us using the contact details provided below:</p><address>Email: contact@example.com<br>Phone: +1 (555) 123-4567</address>');
//     res.end();
// };

// const handleProductsPage = (req, res) => {
//     // Handle the /products route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Our Products</h1><p>Explore our wide range of high-quality products. From electronics to fashion, we have it all!</p>');
//     res.end();
// };

// const handleSubscribePage = (req, res) => {
//     // Handle the /subscribe route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Subscribe</h1><p>Subscribe to our newsletter to stay updated on the latest news and promotions!</p><form action="/subscribe" method="post"><label for="email">Email:</label><input type="email" id="email" name="email" required><button type="submit">Subscribe</button></form>');
//     res.end();
// };

const handleNotFoundPage = (req, res) => {
    // Handle other routes (Not Found)
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
    res.end();
};

const readHtmlFile = (filePath, res) => {
    // Task #2: Read html files from a views folder
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            logError(`[Read File Error] ${err.message}`);
            return handleNotFoundPage(req, res);
        }

        // res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
};

const logError = (message) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const filePath = `logs/error_logs/error_log_${currentDate}.txt`;

    fs.appendFile(filePath, `[${new Date()}] ${message}\n`, (err) => {
        if (err) throw err;
        console.error(message); // Log to console as well
    });
};

const logAccess = (statusCode, message) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const filePath = `logs/access_logs/access_log_${currentDate}.txt`;

    fs.appendFile(filePath, `[${new Date()}] ${statusCode} - ${message}\n`, (err) => {
        if (err) throw err;
        console.log(`${statusCode} - ${message}`); // Log to console as well
    });
};


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

