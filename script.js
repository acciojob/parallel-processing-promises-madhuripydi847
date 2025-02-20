async function downloadImages(imageUrls) {
    const outputDiv = document.getElementById("output");
    const errorDiv = document.getElementById("error");
    const loadingDiv = document.getElementById("loading");
    
    // Clear previous content
    outputDiv.innerHTML = "";
    errorDiv.innerHTML = "";
    loadingDiv.style.display = "block"; // Show loading spinner

    try {
        const imagePromises = imageUrls.map(url => 
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to download image: ${url}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(blob);
                    img.style.width = "200px";
                    return img;
                })
        );

        const images = await Promise.all(imagePromises);
        images.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        loadingDiv.style.display = "none"; // Hide loading spinner
    }
}

