import sys
import getopt
import platform
import os
# Be careful to use the package python-gnupg
# and the version of the package to be
# at least python-gnpug 0.4.1
import gnupg
from pprint import pprint

################
def usage():
  print("Usage: configure [options]")
  print("Where options can be:")
  print("[-h, --help]: prints this message")
  print("[-h, --help]: prints this message")
################

try:
  opts, args = getopt.getopt(sys.argv[1:], 'i:d:o:', ['input=','homedir=','output='])
except getopt.GetoptError:
  sys.exit(2)

home_dir=''
input_file=''
output_file=''

for opt, arg in opts:
  if opt in ('-i', '--input'):
    input_file = arg
  elif opt in ('-d', '--homedir'):
    home_dir = arg
  elif opt in ('-o', '--output'):
    output_file = arg
  else:
    usage()
    sys.exit(2)

if not os.path.exists(home_dir):
  sys.exit("GNUPG home directory '%s' does not exist!" % home_dir)
if not os.path.exists(input_file):
  sys.exit("Input file '%s' does not exist!" % input_file)

#output_file = "./pvs_files/" + input_file + ".gpg"

gpg = gnupg.GPG(gnupghome=home_dir)

print("Executing command: gpg --output %s -r AD702CB0 --encrypt %s" % (output_file,input_file))

with open(input_file, 'rb') as f:
  status = gpg.encrypt_file(f, recipients=['info@pvs-westfalen-sued.de'],output=output_file)

#print('Status:' + str(status.ok))
if not status.ok:
  sys.exit("Encoding was not successful!")
