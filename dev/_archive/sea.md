ers can include assets by adding a key-path dictionary to the configuration as the assets field. At build time, Node.js would read the assets from the specified paths and bundle them into the preparation blob. In the generated executable, users can retrieve the assets using the sea.getAsset() and sea.getAssetAsBlob() APIs.

{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "assets": {
    "a.jpg": "/path/to/a.jpg",
    "b.txt": "/path/to/b.txt"
  }
}
json
copy
The single-executable application can access the assets as follows:

const { getAsset, getAssetAsBlob, getRawAsset, getAssetKeys } = require('node:sea');
// Get all asset keys.
const keys = getAssetKeys();
console.log(keys); // ['a.jpg', 'b.txt']
// Returns a copy of the data in an ArrayBuffer.
const image = getAsset('a.jpg');
// Returns a string decoded from the asset as UTF8.
const text = getAsset('b.txt', 'utf8');
// Returns a Blob containing the asset.
const blob = getAssetAsBlob('a.jpg');
// Returns an ArrayBuffer containing the raw asset without copying.
const raw = getRawAsset('a.jpg');
cjs
Copy
See documentation of the sea.getAsset(), sea.getAssetAsBlob(), sea.getRawAsset() and sea.getAssetKeys() APIs for more information.

Startup snapshot support#
The useSnapshot field can be used to enable startup snapshot support. In this case, the main script would not be executed when the final executable is launched. Instead, it would be run when the single executable application preparation blob is generated on the building machine. The generated preparation blob would then include a snapshot capturing the states initialized by the main script. The final executable, with the preparation blob injected, would deserialize the snapshot at run time.

When useSnapshot is true, the main script must invoke the v8.startupSnapshot.setDeserializeMainFunction() API to configure code that needs to be run when the final executable is launched by the users.

The typical pattern for an application to use snapshot in a single executable application is:

At build time, on the building
