
TARGET				:=	remote

INPUT_DIRS			+=	$(TARGET)/src/
INPUT_DIRS			+=	external/preact/
INPUT_DIRS			+=	external/ui/
INPUT_DIRS			+=	external/svgload/
INPUT_DIRS			+=	external/hashbang/
INPUT_DIRS			+=	common/icons/
INPUT_DIRS			+=	external/3rd-party/obs-websocket/

LINT_IGNORE			+=	external/preact/
LINT_IGNORE			+=	external/3rd-party/obs-websocket/

MAIN_JS				:=	$(TARGET)/src/main.js


# Make this point to the Makefile found in the Carton directory
include ../external/carton/Makefile

# Rules #
fail:
	@echo "[-] Failed to run \"$(TARGET)\"."
