function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

// Hide the loader
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}


async function registerPackage() {
    const senderName = document.getElementById("sender-name").value.trim();
    const senderEmail = document.getElementById("sender-email").value.trim();
    const senderPhone = document.getElementById("sender-phone").value.trim();
    const senderLocation = document.getElementById("sender-location").value.trim();
    const receiverName = document.getElementById("receiver-name").value.trim();
    const receiverEmail = document.getElementById("receiver-email").value.trim();
    const receiverPhone = document.getElementById("receiver-phone").value.trim();
    const receiverLocation = document.getElementById("receiver-location").value.trim();
    const deliveryMode = document.getElementById("delivery-mode").value.trim();
    const contentName = document.getElementById("content-name").value.trim();
    const contentWeight = document.getElementById("content-weight").value.trim();
    const deliveryStatus = document.getElementById("delivery-status").value.trim();
    const trackingId = document.getElementById("tracking-id").value.trim();
    const currentLocation = document.getElementById("current-location").value.trim();
    const checkpoint1 = document.getElementById("checkpoint-1").value.trim();
    const checkpoint2 = document.getElementById("checkpoint-2").value.trim();
    const checkpoint3 = document.getElementById("checkpoint-3").value.trim();
    const checkpoint4 = document.getElementById("checkpoint-4").value.trim();
    const checkpoints = [checkpoint1, checkpoint2, checkpoint3, checkpoint4].filter(cp => cp !== "");


    if (!senderName || !senderEmail || !senderPhone || !senderLocation ||
        !receiverName || !receiverEmail || !receiverPhone || 
        !receiverLocation || !deliveryMode || !contentName || !contentWeight || !deliveryStatus ||  !trackingId || !currentLocation) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Important fields are missing",
        });
    }

    if (!validateEmail(senderEmail) || !validateEmail(receiverEmail)) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid email addresses.",
        });

    }

    if (!validatePhone(senderPhone) || !validatePhone(receiverPhone)) {
        alert("Please enter valid phone numbers.");
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid phone numbers.",
        });
    }

    // Construct the payload
const payload = {
    trackingId,
    senderName,
    senderEmail,
    senderPhone,
    senderLocation,
    receiverName,
    receiverEmail,
    receiverPhone,
    receiverLocation,
    deliveryMode,
    contentName,
    contentWeight,
    deliveryStatus,
    currentLocation,
    ...checkpoints.reduce((acc, checkpoint, index) => ({ ...acc, [`checkpoint${index + 1}`]: checkpoint }), {})
};
    showLoader()
    console.log(payload)

    try {
        const response = await fetch("http://localhost:1200/package/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });


        const data = await response.json();
        console.log(data)

        if (response.status == 400) {
            hideLoader()
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
            });
        }
        console.log("Response:", data);
        hideLoader()
        return Swal.fire({
            icon: "success",
            title: "Success",
            text: "Tracking code generated",
        });

    } catch (error) {
        console.error("Error:", error);
        hideLoader()
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while sending the request. Please try again.",
        });
    }
}


async function trackPackage() {
    console.log("i am clicked")
    const trackID = document.getElementById("track-id").value.trim();

    const baseUrl = "https://emmaserver.onrender.com/package/single/";

    // Construct the full endpoint URL
    const endpoint = `${baseUrl}${trackID}`;
    // Perform the GET request

    if (!trackID) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a tracking ID",
        });
    }
    showLoader()
    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data)
        if (response.status == 400) {
            hideLoader()
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
            });
        }
        hideLoader()
        localStorage.setItem('packageTracking', JSON.stringify(data));
       window.location = "./trackdetails.html"



    } catch (error) {
        console.error("Error:", error);
        hideLoader()
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while sending the request. Please try again.",
        });
    }

}

async function trackPackage2() {
    console.log("i am clicked")
    const trackID = document.getElementById("track-id2").value.trim();

    const baseUrl = "https://emmaserver.onrender.com/package/single/";

    // Construct the full endpoint URL
    const endpoint = `${baseUrl}${trackID}`;
    // Perform the GET request
    showLoader()
    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data)
        if (response.status == 400) {
            hideLoader()
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
            });
        }
        hideLoader()
        localStorage.setItem('packageTracking', JSON.stringify(data));
       window.location = "./trackdetails.html"
    } catch (error) {
        console.error("Error:", error);
        hideLoader()
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while sending the request. Please try again.",
        });
    }

}




function populatePackageInfo() {
    console.log("Oh men am active")
    // Retrieve the package information from local storage
    const packageInfo = JSON.parse(localStorage.getItem('packageTracking'));
    console.log(packageInfo)
    // Check if packageInfo exists
    if (packageInfo) {
        // Populate the HTML elements with the package information
        document.getElementById('tracking-id').innerText = packageInfo.trackingId;
        document.getElementById('sender-name').innerText = packageInfo.senderName;
        document.getElementById('sender-email').innerText = packageInfo.senderEmail;
        document.getElementById('sender-phone').innerText = packageInfo.senderPhone;
        document.getElementById('sender-location').innerText = packageInfo.senderLocation;
        document.getElementById('receiver-name').innerText = packageInfo.receiverName;
        document.getElementById('receiver-email').innerText = packageInfo.receiverEmail;
        document.getElementById('receiver-phone').innerText = packageInfo.receiverPhone;
        document.getElementById('receiver-location').innerText = packageInfo.receiverLocation;
        document.getElementById('content-weight').innerText = packageInfo.contentWeight;
        document.getElementById('content-name').innerText = packageInfo.contentName;
        document.getElementById('delivery-status').innerText = packageInfo.deliveryStatus;
        document.getElementById('delivery-mode').innerText = packageInfo.deliveryMode;
        document.getElementById('current-location').innerText = packageInfo.currentLocation;








        const container = document.querySelector(".checkpoints-container");

        // Function to create a checkpoint element
        function createCheckpoint(description) {
          const checkpointDiv = document.createElement("div");
          checkpointDiv.className = "checkpoint"; // Base class
      
          // Icon
          const iconDiv = document.createElement("div");
          iconDiv.className = "icon";
          iconDiv.innerHTML = '<i class="fas fa-check"></i>'; // Default icon
          checkpointDiv.appendChild(iconDiv);
      
          // Info
          const infoDiv = document.createElement("div");
          infoDiv.className = "info";
          const title = document.createElement("h4");
          title.textContent = description; // Use the full string
          infoDiv.appendChild(title);
          checkpointDiv.appendChild(infoDiv);
      
          return checkpointDiv;
        }
      
        // Add checkpoints dynamically (up to 4 or fewer)
        for (let i = 1; i <= 4; i++) {
          const checkpointKey = `checkpoint${i}`;
          if (packageInfo[checkpointKey]) {
            const description = packageInfo[checkpointKey];
            const checkpointElement = createCheckpoint(description);
            container.appendChild(checkpointElement);
          }
        }
      
        // Fallback if no checkpoints exist
        if (container.children.length === 0) {
          const noDataMessage = document.createElement("p");
          noDataMessage.textContent = "No checkpoints available for this package.";
          container.appendChild(noDataMessage);
        }


    } else {
        // Handle case where no package information is found
        document.getElementById('package-info').innerText = 'No package information found.';
    }
}



// Function to generate and download the receipt
function generateReceipt() {
    // Retrieve the package information from local storage
    const packageInfo = JSON.parse(localStorage.getItem('packageTracking'));

    if (!packageInfo) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No package information found.",
        });
    }

    // Create a new jsPDF instance
    const doc = new jspdf.jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Delivery Receipt", 10, 20);

    // Add package details
    doc.setFontSize(12);
    let y = 30; // Starting Y position for text
    const lineHeight = 10;

    const details = [
        `Tracking ID: ${packageInfo.trackingId}`,
        `Sender Name: ${packageInfo.senderName}`,
        `Sender Email: ${packageInfo.senderEmail}`,
        `Sender Phone: ${packageInfo.senderPhone}`,
        `Sender Location: ${packageInfo.senderLocation}`,
        `Receiver Name: ${packageInfo.receiverName}`,
        `Receiver Email: ${packageInfo.receiverEmail}`,
        `Receiver Phone: ${packageInfo.receiverPhone}`,
        `Receiver Location: ${packageInfo.receiverLocation}`,
        `Delivery Mode: ${packageInfo.deliveryMode}`,
        `Content Name: ${packageInfo.contentName}`,
        `Content Weight: ${packageInfo.contentWeight}`,
        `Delivery Status: ${packageInfo.deliveryStatus}`,
        `Current Location: ${packageInfo.currentLocation}`,
    ];

    details.forEach((detail) => {
        doc.text(detail, 10, y);
        y += lineHeight;
    });

    // Add checkpoints
    y += lineHeight; // Add some space
    doc.text("Checkpoints:", 10, y);
    y += lineHeight;

    for (let i = 1; i <= 4; i++) {
        const checkpointKey = `checkpoint${i}`;
        if (packageInfo[checkpointKey]) {
            doc.text(`Checkpoint ${i}: ${packageInfo[checkpointKey]}`, 10, y);
            y += lineHeight;
        }
    }

    // Add "Delivered" stamp if status is delivered
    if (packageInfo.deliveryStatus.toLowerCase() === "delivered") {
        doc.setFontSize(30);
        doc.setTextColor(255, 0, 0); // Red color
        doc.text("DELIVERED", 100, y + 20, { angle: 45 }); // Rotated stamp
    }

    // Save the PDF
    doc.save("delivery_receipt.pdf");
}

// Attach the function to the button
document.getElementById("download-receipt").addEventListener("click", generateReceipt);




function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,15}$/; // Modify as needed for phone format
    return phoneRegex.test(phone);
}


