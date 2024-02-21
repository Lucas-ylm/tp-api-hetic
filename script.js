document.getElementById("pdfForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const address = document.getElementById("address").value;
    const zipcode = document.getElementById("zipcode").value;
    const city = document.getElementById("city").value;
    const content = document.getElementById("content").value;
    const signature = document.getElementById("signature").value;

    fetch("http://localhost:8080/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            address: address,
            zipcode: zipcode,
            city: city,
            content: content,
            signature: signature,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error("Network response was not ok.");
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            console.log("Title:", title);
            console.log("Content:", content);
            a.download = "custom.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
});