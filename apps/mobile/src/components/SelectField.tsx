import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type SelectFieldProps = {
  label: string;
  onSelect: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string;
};

export function SelectField({ label, onSelect, options, placeholder, value }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" onPress={() => setOpen(true)} style={styles.trigger}>
        <Text style={value ? styles.triggerValue : styles.triggerPlaceholder}>{value || placeholder}</Text>
        <Ionicons color={colors.textMuted} name="chevron-down" size={18} />
      </Pressable>

      <Modal animationType="fade" onRequestClose={() => setOpen(false)} transparent visible={open}>
        <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
          <Pressable style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            {options.map((option) => {
              const active = option === value;

              return (
                <Pressable
                  accessibilityRole="button"
                  key={option}
                  onPress={() => {
                    onSelect(option === value ? "" : option);
                    setOpen(false);
                  }}
                  style={[styles.option, active ? styles.optionActive : undefined]}
                >
                  <Text style={active ? styles.optionTextActive : styles.optionText}>{option}</Text>
                  {active ? <Ionicons color={colors.accent} name="checkmark" size={18} /> : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    gap: spacing.xs,
  },
  label: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  option: {
    alignItems: "center",
    borderRadius: radii.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  optionActive: {
    backgroundColor: colors.goldSoft,
  },
  optionText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
  },
  optionTextActive: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "700",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sheetTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
    paddingBottom: spacing.sm,
  },
  trigger: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
  },
  triggerPlaceholder: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
  },
  triggerValue: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
  },
});
