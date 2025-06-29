const h = document.querySelector("#splash-heading");
const text = h.innerHTML.split("<noscript>")[1].split("</noscript>")[0];
function inpText() {
    let textCounter = 0;
    type = setInterval(() => {
        textCounter++;
        h.innerText = text.slice(0, textCounter);
        if (textCounter == text.length) {
            clearInterval(type)
        }
    }, 120)
}

inpText()

function inpCursor() {
    let state = h.getAttribute("data-cursor");
    if (state === "▏") {
        h.setAttribute("data-cursor", "ᅟ")
        return
    }
    h.setAttribute("data-cursor", "▏")
}

inpCursor()
setInterval(inpCursor, 500)

document.body.addEventListener("mousemove", e => {
    let offset = 1 / document.body.clientWidth * e.x;
    document.querySelector(".book").style.transform = `rotateY(${-20 - 20 * offset}deg)`
})


function observeFullView(element, threshold = 1, rootMargin = '0px') {
    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported in this browser');
      element.classList.add('inView');
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // Element is fully in view
            element.classList.add('inView');
          } else {
            // Element is not fully in view
            if (element.id === "about-photo") {
              return
            }
            element.classList.remove('inView');
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: rootMargin
      }
    );
  
    // Start observing the element
    observer.observe(element);
  
    // Return a function to disconnect the observer when needed
    return () => observer.disconnect();
  }

  document.querySelectorAll(".recent-left").forEach(el => {
    observeFullView(el);
  })
  document.querySelectorAll("#about-photo").forEach(el => {
    observeFullView(el);
  })


  //new
// Non-fiction books data (ASINs extracted from the Amazon links)
const nonFictionBooks = [
  { asin: "0746074476", title: "Caterpillars and Butterflies" },
  { asin: "0746074824", title: "Volcanoes" },
  { asin: "0746074778", title: "Sun, Moon and Stars" },
  { asin: "1474903185", title: "Castles" },
  { asin: "0746074484", title: "Knights" },
  { asin: "074607445X", title: "Dinosaurs" },
  { asin: "1474903223", title: "Egyptians" },
  { asin: "1474903207", title: "Rubbish and Recycling" },
  { asin: "0746074808", title: "Your Body" },
  { asin: "1474903169", title: "Vikings" },
  { asin: "0746074409", title: "Why Do We Eat?" },
  { asin: "0746074859", title: "Ancient Greeks" },
  { asin: "1409531775", title: "Children's World Atlas" },
  { asin: "140953894X", title: "Things to Make with Paper" },
  { asin: "1409514234", title: "Essential Atlas of the World" },
  { asin: "0746062478", title: "Elizabeth I" },
  { asin: "1445131536", title: "Seasons: Spring" },
  { asin: "0746047010", title: "Trains" },
  { asin: "144513179X", title: "Looking Smart for Girls" },
  { asin: "1445131668", title: "Seasons: Autumn" },
  { asin: "B01K9168GE", title: "Grow Stuff" },
  { asin: "1599204983", title: "Mind Reading Tricks and Secrets" },
  { asin: "B01HC9M4HI", title: "Bake Stuff" },
  { asin: "1625880065", title: "Easy Card Tricks for Beginner Magicians" },
  { asin: "1599207990", title: "Circus Skills" },
  { asin: "1445103710", title: "Vanishing Tricks and Secrets" },
  { asin: "1599207966", title: "Craft Skills" },
  { asin: "B01K9BTKD2", title: "Cooking Superskills" },
  { asin: "1445109808", title: "Acting Skills" },
  { asin: "144514171X", title: "Cool Stuff to Sew" },
  { asin: "1445141728", title: "Make with Paper" },
  { asin: "1599209462", title: "Fun with Friends" },
  { asin: "1625883714", title: "Collecting" },
  { asin: "1599208369", title: "Polar Bear" },
  { asin: "1625883870", title: "Skiing and Snowboarding" },
  { asin: "1599209470", title: "Health and Fitness" },
  { asin: "1445131838", title: "Diaries and Keepsakes" },
  { asin: "1625881711", title: "Snake" },
  { asin: "1625881673", title: "Lion" },
  { asin: "1599208377", title: "Tiger" },
  { asin: "1625881657", title: "Hippo" },
  { asin: "1625883803", title: "Games for Sleepovers" },
  { asin: "162588379X", title: "Fabulous Sleepover Secrets" },
  { asin: "1625883862", title: "Climbing" },
  { asin: "162588382X", title: "Canoeing and Kayaking" },
  { asin: "1625883854", title: "Mountain Biking" },
  { asin: "1625883722", title: "Gardening" },
  { asin: "1625882130", title: "Cold Survival Challenge" },
  { asin: "1625881843", title: "Sports Horses" },
  { asin: "1625881835", title: "Show Horses" },
  { asin: "1625881827", title: "Racehorses" },
  { asin: "1625881819", title: "Ponies" },
  { asin: "1770921419", title: "Summer Seasons" },
  { asin: "1625882173", title: "Stranded Survival Challenge" },
  { asin: "1625882149", title: "Emergency Survival Challenge" },
  { asin: "1625882157", title: "Hungry Survival Challenge" },
  { asin: "1625882165", title: "Lost Survival Challenge" },
  { asin: "1625882181", title: "Thirsty Survival Challenge" }
];

// Populate the book scroller
document.addEventListener('DOMContentLoaded', function() {
  const scroller = document.getElementById('book-scroller');
  const display = document.getElementById('book-display');
  
  nonFictionBooks.forEach(book => {
      const container = document.createElement('div');
      container.className = 'book-container';
      container.dataset.asin = book.asin;
      container.title = book.title;
      
      const image = document.createElement('img');
      image.src = `/books/${book.asin}.jpg`;
      // const container = document.createElement('div');
      // container.className = 'book-container';
      // container.dataset.asin = book.asin;
      // container.title = book.title;
      
      // const iframe = document.createElement('iframe');
      // iframe.src = `https://read.amazon.co.uk/kp/card?asin=${book.asin}`;
      // iframe.loading = 'lazy';
      
      container.appendChild(image);
      scroller.appendChild(container);
      
      // Add click handler
      container.addEventListener('click', function() {
          // Update the display
          display.innerHTML = `<iframe src="https://read.amazon.co.uk/kp/card?asin=${book.asin}" style="width:100%;height:500px;border:none;"></iframe>`;
          
          // Scroll to the display
          display.scrollIntoView({ behavior: 'smooth' });
      });
  });
});