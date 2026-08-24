$(document).ready(function () {
    let cards = [];
    let index = 0;

    $(".mode-section").hide();
    $("#flashBtn").hide();
    $("#defBtn").hide();
    $("#nextBtn").hide();
    $("#loadBtn").hide();

    // Load the selected JSON file once.
    $("#jsonFile").change(function () {

        $("#jsonFile").hide();
        $("#jsonFileLabel").hide();

        $("#flashBtn").show();
        $("#loadBtn").show();

        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);

                if (!Array.isArray(data.cards)) {
                    throw new Error("JSON must contain a cards array.");
                }

                cards = data.cards;
                index = 0;

                $("#idBox").text("");
                $("#termBox").text("File loaded. Click Flash Card.");
                $("#definitionBox").hide();
                $("#cardList").empty();

            } catch (err) {
                alert("Invalid JSON file. Expected an object containing a 'cards' array.");
                console.error(err);
            }
        };

        reader.readAsText(file);
    });

    // Show the current term WITH ID
    $("#flashBtn").click(function () {

        $("#flashBtn").hide();
        $("#defBtn").show();
        $("#nextBtn").show();
        $("#loadBtn").hide();

        $(".mode-section").show();

        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        const card = cards[index];
        const id = card.id ?? (index + 1);

        $("#idBox").text(`ID: ${id}`);
        $("#termBox").text(card.term || "");
        $("#definitionBox").hide();
    });

    // Show the current definition WITH ID
    $("#defBtn").click(function () {
        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        const card = cards[index];
        const id = card.id ?? (index + 1);

        $("#idBox").text(`ID: ${id}`);
        $("#definitionBox").text(card.definition || "").show();
    });

    // Move to the next card WITH ID
    $("#nextBtn").click(function () {
        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        index++;
        if (index >= cards.length) {
            index = 0;
        }

        const card = cards[index];
        const id = card.id ?? (index + 1);

        $("#idBox").text(`ID: ${id}`);
        $("#termBox").text(card.term || "");
        $("#definitionBox").hide();
    });

    // Display all cards WITH ID paragraph
    $("#loadBtn").click(function () {

        $("#flashBtn").hide();
        $("#loadBtn").hide();

        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        $("#cardList").empty();

        cards.forEach(function (card, i) {
            const id = card.id ?? (i + 1);

            const cardHtml = `
                <div class="card flash-card mb-2">
                    <div class="card-body">
                        <p class="card-id"><strong>ID:</strong> ${id}</p>
                        <h5 class="card-title">${card.term || ""}</h5>
                        <p class="card-text">${card.definition || ""}</p>
                    </div>
                </div>
            `;

            $("#cardList").append(cardHtml);
        });
    });
});
