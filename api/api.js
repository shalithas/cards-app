let data = {
    "columns": [
      {
        "id": 1,
        "title": "Column 1"
      },
      {
        "id": 2,
        "title": "Column 2"
      },
      {
        "id": 1,
        "title": "Column 1"
      },
      {
        "id": 2,
        "title": "Column 2"
      }
    ],
    "cards": [
      {
        "id": 1,
        "title": "Card 1",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "columnId": 1
      },
      {
        "id": 2,
        "title": "Card 2",
        "description": "Quisque et pellentesque sem.",
        "columnId": 1
      },
      {
        "id": 3,
        "title": "Card 3",
        "description": "Nulla porttitor erat a sollicitudin volutpat.",
        "columnId": 1
      },
      {
        "id": 4,
        "title": "Card 4",
        "description": "Quisque id scelerisque felis, sit amet scelerisque nunc.",
        "columnId": 2
      },
      {
        "id": 5,
        "title": "Card 5",
        "description": "Suspendisse posuere ipsum at dui lacinia, ut faucibus lectus mollis.",
        "columnId": 2
      }
    ]
  };

  export const getData = () => {
      return data;
  }