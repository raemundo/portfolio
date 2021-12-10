import re
import sys

fpath = sys.argv[1]
with open(fpath, "r") as f:
    trans = f.read()

expr = r"static (m\d+)\(.*?\) =>(.*?);"

for i in re.findall(expr, trans):
    trans = trans.replace(f': {i[0]},', f':{i[1]},')

for i in [
    ('MessageLookupByLibrary.simpleMessage(', ''), 
    ('"),', '",'), 
    ("\\'", "'"), 
    ('${', '{'),
    ('''// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a en locale. All the
// messages from the main program should be duplicated here with the same
// function name.

// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps, unnecessary_new
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = new MessageLookup();

typedef String MessageIfAbsent(String messageStr, List<dynamic> args);

class MessageLookup extends MessageLookupByLibrary''','')
]:
    trans = trans.replace(i[0], i[1])

with open(fpath, "w") as f:
    f.write(trans)
