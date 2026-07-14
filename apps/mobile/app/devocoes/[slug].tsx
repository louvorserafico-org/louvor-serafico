import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { findDevotionBySlug } from "@/features/devotions/devotions";
import {
  findNovenaDay,
  novenaBlessing,
  novenaDailyPrayer,
  novenaDays,
  novenaPrayerOfFrancis,
  novenaSteps,
} from "@/features/devotions/novena-content";
import { transitoSections } from "@/features/devotions/transito-content";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function DevotionScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const devotion = findDevotionBySlug(params.slug ?? "");

  if (!devotion) {
    return (
      <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
        <Stack.Screen options={{ headerShown: true, title: "Devoção" }} />
        <PageHeader
          eyebrow="Devoções"
          title="Devoção não encontrada"
          subtitle="Esta devoção ainda não está disponível no aplicativo."
        />
      </ScrollView>
    );
  }

  if (devotion.status === "preparing") {
    return (
      <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
        <Stack.Screen options={{ headerShown: true, title: devotion.title }} />
        <PageHeader eyebrow="Devoção" title={devotion.title} subtitle={devotion.description} />
        <View style={styles.card}>
          <EditorialSectionHeader
            eyebrow="Em preparação"
            subtitle="O texto desta devoção está sendo preparado com cuidado editorial."
            title="Oração em preparação"
          />
        </View>
      </ScrollView>
    );
  }

  if (devotion.slug === "novena-sao-francisco") {
    return <NovenaScreen title={devotion.title} />;
  }

  if (devotion.slug === "transito-sao-francisco") {
    return <TransitoScreen title={devotion.title} />;
  }

  return null;
}

function NovenaScreen({ title }: { title: string }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const day = findNovenaDay(selectedDay);

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title }} />
      <PageHeader
        eyebrow="Novena"
        title="Novena de São Francisco"
        subtitle="Nove dias de oração na companhia do Poverello de Assis."
      />

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Passo a passo" title="Como rezar" />
        {novenaSteps.map((step, index) => (
          <Text key={step} style={styles.stepText}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Todos os dias" title="Oração inicial" />
        <Text style={styles.prayerText}>{novenaDailyPrayer}</Text>
      </View>

      <EditorialSectionHeader eyebrow="Escolha o dia" title="Meditação diária" />
      <View style={styles.dayPicker}>
        {novenaDays.map((item) => (
          <Pressable
            key={item.day}
            onPress={() => setSelectedDay(item.day)}
            style={[styles.dayChip, selectedDay === item.day ? styles.dayChipActive : undefined]}
          >
            <Text style={[styles.dayChipText, selectedDay === item.day ? styles.dayChipTextActive : undefined]}>
              {item.day}º
            </Text>
          </Pressable>
        ))}
      </View>

      {day ? (
        <View style={styles.card}>
          <EditorialSectionHeader eyebrow={`${day.day}º dia`} title="Meditação" />
          <Text style={styles.prayerText}>{day.meditation}</Text>
          <Text style={styles.suggestionText}>Sugestão de leitura: {day.suggestion}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Oração de São Francisco" title="Instrumento de paz" />
        <Text style={styles.prayerText}>{novenaPrayerOfFrancis}</Text>
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Encerramento" title="Bênção de São Francisco" />
        <Text style={styles.prayerText}>{novenaBlessing}</Text>
      </View>
    </ScrollView>
  );
}

function TransitoScreen({ title }: { title: string }) {
  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title }} />
      <PageHeader
        eyebrow="Trânsito"
        title="Celebração do Trânsito de São Francisco"
        subtitle="Roteiro da vigília na véspera da festa de São Francisco de Assis, 3 de outubro."
      />

      {transitoSections.map((section) => (
        <View key={section.id} style={styles.card}>
          <EditorialSectionHeader eyebrow="Roteiro" title={section.title} />
          {section.lines.map((line, index) => (
            <View key={`${section.id}-${index}`} style={styles.transitoLine}>
              {line.speaker ? <Text style={styles.speakerLabel}>{line.speaker}</Text> : null}
              <Text style={styles.prayerText}>{line.text}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  dayChip: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    justifyContent: "center",
    minWidth: 44,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  dayChipActive: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.accentStrong,
  },
  dayChipText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  dayChipTextActive: {
    color: colors.accentStrong,
  },
  dayPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  prayerText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  speakerLabel: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  stepText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 22,
  },
  suggestionText: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  transitoLine: {
    gap: spacing.xs,
  },
});
