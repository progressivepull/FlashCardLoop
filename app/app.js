$(document).ready(function () {
    let cards = [];
    let index = 0;

    // Load the selected JSON file once.
    $("#jsonFile").change(function () {
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

    // Show the current term.
    $("#flashBtn").click(function () {
        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        $("#termBox").text(cards[index].term || "");
        $("#definitionBox").hide();
    });

    // Show the current definition.
    $("#defBtn").click(function () {
        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        $("#definitionBox").text(cards[index].definition || "").show();
    });

    // Move to the next card.
    $("#nextBtn").click(function () {
        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        index++;
        if (index >= cards.length) {
            index = 0;
        }

        $("#termBox").text(cards[index].term || "");
        $("#definitionBox").hide();
    });

    // Display all cards.
    $("#loadBtn").click(function () {
        if (cards.length === 0) {
            alert("Load a JSON file first.");
            return;
        }

        $("#cardList").empty();

        cards.forEach(function (card) {
            const cardHtml = `
                <div class="card flash-card">
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            `;

            const $card = $(cardHtml);
            $card.find(".card-title").text(card.term || "");
            $card.find(".card-text").text(card.definition || "");

            $("#cardList").append($card);
        });
    });
});
