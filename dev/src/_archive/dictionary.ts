const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const az =
    "abcdefghijklmnopqrstuvwxyz355445gjkufvxsfhi8tfdef";
const base10 = "0123456789";

type Coordinate = `${number}:${number}`;

interface Dictionary {
    readonly byCoordinate:
    Readonly<Record<Coordinate, string>>;

    readonly byForm:
    Readonly<Record<string, readonly Coordinate[]>>;
}

export function buildManifest(
    lines: readonly string[]
): Dictionary {
    const byCoordinate:
        Record<Coordinate, string> =
        Object.create(null);

    const mutableByForm:
        Record<string, Coordinate[]> =
        Object.create(null);

    lines.forEach((line, scope) => {
        Array.from(line).forEach((form, position) => {
            const coordinate =
                `${scope}:${position}` as Coordinate;

            byCoordinate[coordinate] = form;

            (
                mutableByForm[form] ??= []
            ).push(coordinate);
        });
    });

    const byForm = Object.fromEntries(
        Object.entries(mutableByForm).map(
            ([form, coordinates]) => [
                form,
                Object.freeze(coordinates)
            ]
        )
    );

    return Object.freeze({
        byCoordinate: Object.freeze(byCoordinate),
        byForm: Object.freeze(byForm)
    });
};

(() => {
    const dictionary = buildManifest([
        base10,
        AZ,
        az
    ]);

    console.log(dictionary.byCoordinate["0:0"]);
    // "0"

    console.log(dictionary.byCoordinate["1:0"]);
    // "A"

    console.log(dictionary.byCoordinate["2:0"]);
    // "a"

    console.log(dictionary.byForm["A"]);
    // ["1:0"]

    console.log(dictionary.byForm["3"]);
    // ["0:3", "2:26", "2:27"]
})();
