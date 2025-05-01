document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');

    async function fetchMembers() {
        const res = await fetch('/members/all');
        const members = await res.json();
        renderMembers(members);
    }

    function renderMembers(members) {
        tableBody.innerHTML = '';
        members.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="th-td-default">${index + 1}</td>
                <td class="th-td-default">${member.member_name}</td>
                <td class="th-td-default">${member.member_fname}</td>
                <td class="th-td-default">${member.member_top_cat}</td>
                <td class="th-td-default">${member.member_sub_cat_1}</td>
                <td class="th-td-default">${member.member_sub_cat_2}</td>
                <td class="th-td-default">${member.member_sub_cat_3 || '-'}</td>
                <td class="th-td-default">${member.member_sub_cat_4 || '-'}</td>
                <td class="th-td-default">${member.member_email}</td>
                <td class="th-td-default">${member.member_district}</td>
                <td class="th-td-default">
                    <button class="btn-admin-actions edit-btn" data-id="${member._id}">Edit</button>
                    <button class="btn-admin-actions ml-2 delete-btn" data-id="${member._id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Event delegation
    tableBody.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('edit-btn')) {
            handleEdit(target, id);
        } else if (target.classList.contains('save-btn')) {
            handleSave(target, id);
        } else if (target.classList.contains('cancel-btn')) {
            fetchMembers();
        } else if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this member?')) {
                await fetch(`/members/${id}`, { method: 'DELETE' });
                fetchMembers();
            }
        }
    });

    async function handleEdit(button, id) {
        const row = button.closest('tr');
        const cells = row.querySelectorAll('td');

        const memberRes = await fetch(`/members/all`);
        const members = await memberRes.json();
        const member = members.find(m => m._id === id);

        row.innerHTML = `
            <td class="th-td-default">${cells[0].textContent}</td>
            <td class="th-td-default"><input type="text" value="${member.member_name}" class="input-edit"></td>
            <td class="th-td-default"><input type="text" value="${member.member_fname}" class="input-edit"></td>
            <td class="th-td-default"><select class="input-edit" id="editTopCat"></select></td>
            <td class="th-td-default"><select class="input-edit" id="editSubCat1"></select></td>
            <td class="th-td-default"><select class="input-edit" id="editSubCat2"></select></td>
            <td class="th-td-default"><select class="input-edit" id="editSubCat3"></select></td>
            <td class="th-td-default"><select class="input-edit" id="editSubCat4"></select></td>
            <td class="th-td-default"><input type="email" value="${member.member_email}" class="input-edit"></td>
            <td class="th-td-default"><input type="text" value="${member.member_district}" class="input-edit"></td>
            <td class="th-td-default">
                <button class="btn-admin-actions save-btn" data-id="${id}">Save</button>
                <button class="btn-admin-actions ml-2 cancel-btn">Cancel</button>
            </td>
        `;

        // Load the dropdown options after creating them
        setupHierarchySelectors({
            topCatSelectId: 'editTopCat',
            subCat1SelectId: 'editSubCat1',
            subCat2SelectId: 'editSubCat2',
            subCat3SelectId: 'editSubCat3',
            subCat4SelectId: 'editSubCat4',
            preselected: {
                topCat: member.member_top_cat,
                subCat1: member.member_sub_cat_1,
                subCat2: member.member_sub_cat_2,
                subCat3: member.member_sub_cat_3,
                subCat4: member.member_sub_cat_4,
            }
        });
    }

    async function handleSave(button, id) {
        const row = button.closest('tr');
        const inputs = row.querySelectorAll('.input-edit');

        const payload = {
            member_name: inputs[0].value,
            member_fname: inputs[1].value,
            member_top_cat: document.getElementById('editTopCat').value,
            member_sub_cat_1: document.getElementById('editSubCat1').value,
            member_sub_cat_2: document.getElementById('editSubCat2').value,
            member_sub_cat_3: document.getElementById('editSubCat3').value,
            member_sub_cat_4: document.getElementById('editSubCat4').value,
            member_email: inputs[8].value,
            member_district: inputs[9].value,
            member_address: "-",  // or collect properly if you have address field
            member_phone_number: "-", // same for phone
        };

        await fetch(`/members/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        fetchMembers();
    }

    fetchMembers();
});
