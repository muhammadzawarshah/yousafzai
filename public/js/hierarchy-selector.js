document.addEventListener("DOMContentLoaded", () => {
    const topCatSelect = document.getElementById("top_cat");
    const subCat1Select = document.getElementById("sub_cat_1");
    const subCat2Select = document.getElementById("sub_cat_2");
    const subCat3Select = document.getElementById("sub_cat_3");
    const subCat4Select = document.getElementById("sub_cat_4");

    // Utility to populate select options
    function populateSelect(selectEl, data, label = "name", value = "_id") {
        selectEl.innerHTML = '<option value="">Select an option</option>';
        data.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item[value];
            opt.textContent = item[label];
            selectEl.appendChild(opt);
        });
    }

    // Utility to update label text based on previous selection
    function updateLabel(selectEl, labelId, levelText) {
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const labelEl = document.getElementById(labelId);
        if (selectedOption && selectedOption.textContent && labelEl) {
            labelEl.innerHTML = `Select <span class="text-red-800 font-bold">${selectedOption.textContent}</span> ${levelText}`;
        }
    }

    // Fetch and populate main casts
    fetch("/members/api/main-casts")
        .then(res => res.json())
        .then(data => populateSelect(topCatSelect, data))
        .catch(err => console.error("Error loading main casts:", err));

    // Handle topCat change
    topCatSelect.addEventListener("change", () => {
        const mainCastId = topCatSelect.value;
        if (!mainCastId) return;

        fetch(`/members/api/sub-casts-1/${mainCastId}`)
            .then(res => res.json())
            .then(data => {
                populateSelect(subCat1Select, data);
                subCat2Select.innerHTML = '<option value="">Select an option</option>';
                subCat3Select.innerHTML = '<option value="">Select an option</option>';
                subCat4Select.innerHTML = '<option value="">Select an option</option>';
                updateLabel(topCatSelect, "label_sub_cat_1", "Sub Cast");
            });
    });

    // Handle subCat1 change
    subCat1Select.addEventListener("change", () => {
        const mainCastId = topCatSelect.value;
        const subCast1Id = subCat1Select.value;
        if (!mainCastId || !subCast1Id) return;

        fetch(`/members/api/sub-casts-2/${mainCastId}/${subCast1Id}`)
            .then(res => res.json())
            .then(data => {
                populateSelect(subCat2Select, data);
                subCat3Select.innerHTML = '<option value="">Select an option</option>';
                subCat4Select.innerHTML = '<option value="">Select an option</option>';
                updateLabel(subCat1Select, "label_sub_cat_2", "Sub Cast");
            });
    });

    // Handle subCat2 change
    subCat2Select.addEventListener("change", () => {
        const mainCastId = topCatSelect.value;
        const subCast1Id = subCat1Select.value;
        const subCast2Id = subCat2Select.value;
        if (!mainCastId || !subCast1Id || !subCast2Id) return;

        fetch(`/members/api/sub-casts-3/${mainCastId}/${subCast1Id}/${subCast2Id}`)
            .then(res => res.json())
            .then(data => {
                populateSelect(subCat3Select, data);
                subCat4Select.innerHTML = '<option value="">Select an option</option>';
                updateLabel(subCat2Select, "label_sub_cat_3", "Sub Cast");
            });
    });

    // Handle subCat3 change
    subCat3Select.addEventListener("change", () => {
        const mainCastId = topCatSelect.value;
        const subCast1Id = subCat1Select.value;
        const subCast2Id = subCat2Select.value;
        const subCast3Id = subCat3Select.value;
        if (!mainCastId || !subCast1Id || !subCast2Id || !subCast3Id) return;

        fetch(`/members/api/sub-casts-4/${mainCastId}/${subCast1Id}/${subCast2Id}/${subCast3Id}`)
            .then(res => res.json())
            .then(data => {
                populateSelect(subCat4Select, data);
                updateLabel(subCat3Select, "label_sub_cat_4", "Sub Cast");
            });
    });
});
