# For Startups — katalog publiczny

Publiczny katalog możliwości dla startupów. Ta strona opisuje, **co** jest
publikowane i **jak** rozumieć oznaczenia.

## Co publikujemy

Opportunity (możliwość) to program z:

1. identyfikowalnym dostawcą,
2. identyfikowalną korzyścią,
3. aktualną, nadchodzącą lub ciągłą ścieżką aplikacji,
4. określonym lub wykonalnymi do ustalenia kryteriami,
5. autorytatywnym źródłem.

Nie publikujemy: wiadomości o finansowaniu startupów, fuzji i przejęć, wywiadów,
rankingów bez realnej ścieżki aplikacji ani zamkniętych programów bez kolejnej
rundy (te ostatnie trafiają do archiwum).

## Status życia cyklu

| Status | Znaczenie |
|---|---|
| `OPEN` | nabór otwarty |
| `ROLLING` | nabór ciągły, bez terminu granicznego |
| `UPCOMING_CONFIRMED` | **oficjalne źródło ogłasza** otwarcie naboru |
| `EXPECTED_RECURRENCE` | **wnioskowane z wcześniejszych edycji** — to nie jest oficjalnie ogłoszony nabór |
| `CLOSED` | nabór zamknięty (pozostaje w archiwum) |
| `PAUSED` | nabór wstrzymany |
| `UNKNOWN` | status niepotwierdzony przez źródło |

`UPCOMING_CONFIRMED` i `EXPECTED_RECURRENCE` nigdy nie są ze sobą mylone:
drugi zawsze nosi oznaczenie „nieoficjalne” i nigdy nie jest prezentowany jako
ogłoszenie.

## Gdzie co znajdziesz

* **Katalog** (`/`) pokazuje pozycje, które potwierdziliśmy jako otwarte,
  ciągłe lub oficjalnie nadchodzące.
* **Archiwum** (`/historia/`) ma dwie osobne, podpisane grupy:
  * **Status niepotwierdzony** — źródło nie potwierdza aktualnego statusu.
    To **nie** jest informacja o zamknięciu naboru,
  * **Zamknięte i wstrzymane** — nabór nie jest otwarty.

Nie potwierdzamy statusu, nie chowamy takiej pozycji po cichu i nie
przypisujemy jej domyślnie statusu „zamknięte”.

## Zasięg geograficzny

`🇵🇱 Polska`, `🇪🇺 Unia Europejska`, `🌍 Globalny` wynikają z **kwalifikowalności**,
nigdy z siedziby dostawcy. Etykiety regionalne (np. CEE) pojawiają się tylko
wtedy, gdy rzeczywiste kryteria je uzasadniają.

## Daty i godziny

* Data bez godziny jest publikowana **wyłącznie jako data**. Nigdy nie
  dopisujemy godziny 23:59 ani żadnej innej.
* Godzina pojawia się tylko wtedy, gdy podaje ją źródło — wtedy pokazujemy ją
  wraz ze strefą.
* Osobno trzymamy: `discovered_at` (kiedy pierwszy raz zobaczyliśmy rekord),
  `last_checked_at` (ostatnie odpytanie źródła), `last_verified_at`
  (ostatnia weryfikacja), `opens_at` i `closes_at` (terminy naboru).

Przykład na froncie:

```
Ostatnia aktualizacja danych: 30.09.2026, 14:46 CEST
Następna planowana aktualizacja: 01.10.2026, 14:00 CEST
```

## Harmonogram

Codzienne odświeżanie o **14:00 Europe/Warsaw** (z uwzględnieniem DST).
Nieudana walidacja nigdy nie publikuje zepsutego katalogu.

## Unknown ≠ nie

`UNKNOWN` nie jest równoznaczne z `NO`, `FALSE`, `0` ani `NOT_APPLICABLE`.
Brak informacji pozostaje brakiem informacji, aż do momentu, gdy dowód z
autorytatywnego źródła ją rozstrzygnie.

## źródła

Każdy rekord publikuje swoje dowody (URL + autorytet + to, co dokładnie
potwierdzają). Źródło autorytatywne (strona programu) ma pierwszeństwo nad
agregatorem.
