export const KlientList = [
    {
        "_id": 1,
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "email": "jan.kowalski@gmail.com",
        "data_urodzenia": "1978-06-27T00:00:00.000Z",
    },
    {
        "_id": 2,
        "imie": "Łukasz",
        "nazwisko": "Adamski",
        "email": "lukasz.adamski@wp.com",
        "data_urodzenia": "1999-02-11T00:00:00.000Z",
    },
    {
        "_id": 3,
        "imie": "Krzysztof",
        "nazwisko": "Protasiewicz",
        "email": "k.protasiewicz@wp.com",
        "data_urodzenia": "1969-11-19T00:00:00.000Z",
    }
]

export const KlientDetailsList = [
    {
        "_id": 1,
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "email": "jan.kowalski@gmail.com",
        "data_urodzenia": "1978-06-27T00:00:00.000Z",
        "wypozyczenia": [
            {
                "_id": 1,
                "data_wypozyczenia": "2022-10-12T00:00:00.000Z",
                "data_zwrotu": "2022-11-12T00:00:00.000Z",
                "auto_Id": 1,
                "klient_Id": 1,
                "auto": {
                    "_id": 1,
                    "producent": "Skoda",
                    "model": "Superb",
                    "rok_produkcji": "2018",
                    "kolor": "Czarny",
                    "moc_silnika": "150",
                    }
            },
        ]
    },
    {
        "_id": 2,
        "imie": "Łukasz",
        "nazwisko": "Adamski",
        "email": "lukasz.adamski@wp.com",
        "data_urodzenia": "1999-02-11T00:00:00.000Z",
        "wypozyczenia": [
            {
                "_id": 3,
                "data_wypozyczenia": "2022-10-09T00:00:00.000Z",
                "data_zwrotu": null,
                "auto_Id": 1,
                "klient_Id": 2,
                "auto": {
                    "_id": 1,
                    "producent": "Skoda",
                    "model": "Superb",
                    "rok_produkcji": "2018",
                    "kolor": "Czarny",
                    "moc_silnika": "150",
                    }
            }
        ]
    },
    {
        "_id": 3,
        "imie": "Krzysztof",
        "nazwisko": "Protasiewicz",
        "email": "k.protasiewicz@wp.com",
        "data_urodzenia": "1969-11-19T00:00:00.000Z",
        "wypozyczenia": [
            {
                "_id": 2,
                "data_wypozyczenia": "2022-09-30T00:00:00.000Z",
                "data_zwrotu": "2022-10-07T00:00:00.000Z",
                "auto_Id": 2,
                "klient_Id": 3,
                "auto": {
                    "_id": 2,
                    "producent": "BMW",
                    "model": "i8",
                    "rok_produkcji": "2015",
                    "kolor": "Czerwony",
                    "moc_silnika": "270",
                    }
            }
        ]
    }
]
