// app.js
import { register } from 'node:module';
//import * as metron from 'metron';

// Register the hook file path relative to the current file
register('./my-hooks.js', import.meta.url, { data: { env: 'production' } });
f
// Subsequent imports will now route through your hooks
import 'virtual-module'; 
