WebP ファイルにイメージ ファイルを圧縮する
.png, .jpg etc... --> .webp

cwebp input_file -o output_file.webp

https://developers.google.com/speed/webp/docs/cwebp

Encoding tool:
==============

The bin/ directory contains tools for encoding (cwebp.exe) and
decoding (dwebp.exe) images.

The easiest use should look like:
  cwebp input.png -q 80 -o output.webp
which will convert the input file to a WebP file using a quality factor of 80
on a 0->100 scale (0 being the lowest quality, 100 being the best. Default
value is 75).
You might want to try the -lossless flag too, which will compress the source
(in RGBA format) without any loss. The -q quality parameter will in this case
control the amount of processing time spent trying to make the output file as
small as possible.

A longer list of options is available using the -longhelp command line flag:

> cwebp -longhelp
Usage:
 cwebp [-preset <...>] [options] in_file [-o out_file]

If input size (-s) for an image is not specified, it is
assumed to be a PNG, JPEG, TIFF or WebP file.
Note: Animated PNG and WebP files are not supported.

Options:
  -h / -help ............. short help
  -H / -longhelp ......... long help
  -q <float> ............. quality factor (0:small..100:big), default=75
  -alpha_q <int> ......... transparency-compression quality (0..100),
                           default=100
  -preset <string> ....... preset setting, one of:
                            default, photo, picture,
                            drawing, icon, text
     -preset must come first, as it overwrites other parameters
  -z <int> ............... activates lossless preset with given
                           level in [0:fast, ..., 9:slowest]

  -m <int> ............... compression method (0=fast, 6=slowest), default=4
  -segments <int> ........ number of segments to use (1..4), default=4
  -size <int> ............ target size (in bytes)
  -psnr <float> .......... target PSNR (in dB. typically: 42)

  -s <int> <int> ......... input size (width x height) for YUV
  -sns <int> ............. spatial noise shaping (0:off, 100:max), default=50
  -f <int> ............... filter strength (0=off..100), default=60
  -sharpness <int> ....... filter sharpness (0:most .. 7:least sharp), default=0
  -strong ................ use strong filter instead of simple (default)
  -nostrong .............. use simple filter instead of strong
  -sharp_yuv ............. use sharper (and slower) RGB->YUV conversion
  -partition_limit <int> . limit quality to fit the 512k limit on
                           the first partition (0=no degradation ... 100=full)
  -pass <int> ............ analysis pass number (1..10)
  -qrange <min> <max> .... specifies the permissible quality range
                           (default: 0 100)
  -crop <x> <y> <w> <h> .. crop picture with the given rectangle
  -resize <w> <h> ........ resize picture (after any cropping)
  -mt .................... use multi-threading if available
  -low_memory ............ reduce memory usage (slower encoding)
  -map <int> ............. print map of extra info
  -print_psnr ............ prints averaged PSNR distortion
  -print_ssim ............ prints averaged SSIM distortion
  -print_lsim ............ prints local-similarity distortion
  -d <file.pgm> .......... dump the compressed output (PGM file)
  -alpha_method <int> .... transparency-compression method (0..1), default=1
  -alpha_filter <string> . predictive filtering for alpha plane,
                           one of: none, fast (default) or best
  -exact ................. preserve RGB values in transparent area, default=off
  -blend_alpha <hex> ..... blend colors against background color
                           expressed as RGB values written in
                           hexadecimal, e.g. 0xc0e0d0 for red=0xc0
                           green=0xe0 and blue=0xd0
  -noalpha ............... discard any transparency information
  -lossless .............. encode image losslessly, default=off
  -near_lossless <int> ... use near-lossless image
                           preprocessing (0..100=off), default=100
  -hint <string> ......... specify image characteristics hint,
                           one of: photo, picture or graph

  -metadata <string> ..... comma separated list of metadata to
                           copy from the input to the output if present.
                           Valid values: all, none (default), exif, icc, xmp

  -short ................. condense printed message
  -quiet ................. don't print anything
  -version ............... print version number and exit
  -noasm ................. disable all assembly optimizations
  -v ..................... verbose, e.g. print encoding/decoding times
  -progress .............. report encoding progress

Experimental Options:
  -jpeg_like ............. roughly match expected JPEG size
  -af .................... auto-adjust filter strength
  -pre <int> ............. pre-processing filter


The main options you might want to try in order to further tune the
visual quality are:
 -preset
 -sns
 -f
 -m

Namely:
  * 'preset' will set up a default encoding configuration targeting a
     particular type of input. It should appear first in the list of options,
     so that subsequent options can take effect on top of this preset.
     Default value is 'default'.
  * 'sns' will progressively turn on (when going from 0 to 100) some additional
     visual optimizations (like: segmentation map re-enforcement). This option
     will balance the bit allocation differently. It tries to take bits from the
     "easy" parts of the picture and use them in the "difficult" ones instead.
     Usually, raising the sns value (at fixed -q value) leads to larger files,
     but with better quality.
     Typical value is around '75'.
  * 'f' option directly links to the filtering strength used by the codec's
     in-loop processing. The higher the value, the smoother the
     highly-compressed area will look. This is particularly useful when aiming
     at very small files. Typical values are around 20-30. Note that using the
     option -strong/-nostrong will change the type of filtering. Use "-f 0" to
     turn filtering off.
  * 'm' controls the trade-off between encoding speed and quality. Default is 4.
     You can try -m 5 or -m 6 to explore more (time-consuming) encoding
     possibilities. A lower value will result in faster encoding at the expense
     of quality.