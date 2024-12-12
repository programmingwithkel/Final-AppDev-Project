
const form = document.querySelector("form");


form.addEventListener("submit", (e) => {
    e.preventDefault();

   
    const isConfirmed = confirm("Confirm order?");
    if (!isConfirmed) {
        console.log("Form submission canceled.");
        return;
    }

    const fd = new FormData(form);
    const obj = {};
    let total = 0;

    
    const prices = {
        sodaPop: 90,
        fruityYakult: 100,
    };

  
    fd.forEach((value, key) => {
        if (key.endsWith("Amount")) {
            const quantity = parseInt(value, 10) || 0; 
            if (quantity > 0) {
                const itemType = key.includes("SodaPop") ? "sodaPop" : "fruityYakult";
                total += quantity * prices[itemType];
                obj[key] = quantity;
            }
        }
    });

    
    obj.total = `${total} pesos`;

 
    console.log(obj);

    
    const json = JSON.stringify(obj, null, 2);
    localStorage.setItem("form", json);

    
    const blob = new Blob([json], { type: "text/plain" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "order.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
});
