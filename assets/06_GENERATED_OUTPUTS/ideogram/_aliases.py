"""Single source of truth for short photo aliases.

Aliases:
  Number  Name         Filename
  1       hero         ideogram_angle-01_A1_hero_v3.png
  2       lifestyle    ideogram_angle-01_A2_lifestyle_v2.png
  3       strap-macro  ideogram_angle-02_B1_macro_v4_textfree.png
  4       strap-hand   gpt_angle-02_B2_lifestyle_v4.png
  5       spec         ideogram_angle-03_C1_hero_v4_dark.png

Use resolve(alias_or_filename) anywhere — accepts: number, name, full filename, or stem.
"""

ALIASES = {
    "1":           "ideogram_angle-01_A1_hero_v3.png",
    "hero":        "ideogram_angle-01_A1_hero_v3.png",
    "a1":          "ideogram_angle-01_A1_hero_v3.png",

    "2":           "ideogram_angle-01_A2_lifestyle_v2.png",
    "lifestyle":   "ideogram_angle-01_A2_lifestyle_v2.png",
    "a2":          "ideogram_angle-01_A2_lifestyle_v2.png",
    "backpack":    "ideogram_angle-01_A2_lifestyle_v2.png",

    "3":           "ideogram_angle-02_B1_macro_v4_textfree.png",
    "strap-macro": "ideogram_angle-02_B1_macro_v4_textfree.png",
    "macro":       "ideogram_angle-02_B1_macro_v4_textfree.png",
    "b1":          "ideogram_angle-02_B1_macro_v4_textfree.png",

    "4":           "gpt_angle-02_B2_lifestyle_v4.png",
    "strap-hand":  "gpt_angle-02_B2_lifestyle_v4.png",
    "hand":        "gpt_angle-02_B2_lifestyle_v4.png",
    "b2":          "gpt_angle-02_B2_lifestyle_v4.png",

    "5":           "ideogram_angle-03_C1_hero_v4_dark.png",
    "spec":        "ideogram_angle-03_C1_hero_v4_dark.png",
    "50000":       "ideogram_angle-03_C1_hero_v4_dark.png",
    "c1":          "ideogram_angle-03_C1_hero_v4_dark.png",
}

NUMBER_LABEL = {
    "ideogram_angle-01_A1_hero_v3.png":           ("1", "hero",        "Never at 0. (hero)"),
    "ideogram_angle-01_A2_lifestyle_v2.png":      ("2", "lifestyle",   "Never at 0. (backpack lifestyle)"),
    "ideogram_angle-02_B1_macro_v4_textfree.png": ("3", "strap-macro", "The strap people ask about. (master plate, text-free)"),
    "gpt_angle-02_B2_lifestyle_v4.png":           ("4", "strap-hand",  "The strap people ask about. (with hand)"),
    "ideogram_angle-03_C1_hero_v4_dark.png":      ("5", "spec",        "50,000 mAh. But that is not the point."),
}

def resolve(alias_or_filename: str) -> str | None:
    """Return the canonical filename for any alias, number, name, or already-canonical filename."""
    if not alias_or_filename: return None
    s = alias_or_filename.strip().lower()
    if s in ALIASES: return ALIASES[s]
    # Already a full filename?
    for fn in NUMBER_LABEL:
        if s == fn.lower(): return fn
    # Try as stem (without .png)
    s_png = s if s.endswith(".png") else s + ".png"
    for fn in NUMBER_LABEL:
        if s_png == fn.lower(): return fn
    return None

def label(filename: str) -> str:
    """Return 'N — name — concept' display string for a filename."""
    info = NUMBER_LABEL.get(filename)
    if not info: return filename
    n, nm, concept = info
    return f"{n} ({nm}) — {concept}"
