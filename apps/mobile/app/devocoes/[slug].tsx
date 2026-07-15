import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { findDevotionBySlug } from "@/features/devotions/devotions";
import {
  findNovenaDay,
  novenaClosingVersicle,
  novenaCollectPrayer,
  novenaDays,
  novenaFinalPrayer,
  novenaLadainhaClosing,
  novenaLadainhaInvocations,
  novenaReconciliationText,
  novenaSongs,
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
        subtitle="Rito fora da liturgia da Missa, de 25 de setembro a 3 de outubro, subsídio oficial da Província São Maximiliano Maria Kolbe do Brasil para os 800 anos da páscoa do Poverello de Assis."
      />

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Todos os dias" title="São Francisco, homem reconciliado" />
        <Text style={styles.prayerText}>{novenaReconciliationText}</Text>
        <Text style={styles.prayerText}>{novenaCollectPrayer}</Text>
      </View>

      <EditorialSectionHeader eyebrow="Escolha o dia" title="Fato da vida de São Francisco" />
      <View style={styles.dayPicker}>
        {novenaDays.map((item) => (
          <AnimatedPressable
            key={item.day}
            onPress={() => setSelectedDay(item.day)}
            style={[styles.dayChip, selectedDay === item.day ? styles.dayChipActive : undefined]}
          >
            <Text style={[styles.dayChipText, selectedDay === item.day ? styles.dayChipTextActive : undefined]}>
              {item.day}º
            </Text>
          </AnimatedPressable>
        ))}
      </View>

      {day ? (
        <View style={styles.card}>
          <EditorialSectionHeader eyebrow={`${day.day}º dia`} title={day.theme} />
          <Text style={styles.suggestionText}>{day.reference}</Text>
          <Text style={styles.prayerText}>{day.reading}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Anexo A" title="Ladainha de São Francisco" />
        {novenaLadainhaInvocations.map((line, index) => (
          <Text key={`${index}-${line}`} style={styles.prayerText}>
            {line}
          </Text>
        ))}
        {novenaLadainhaClosing.lambOfGod.map((line) => (
          <Text key={line} style={styles.prayerText}>
            {line}
          </Text>
        ))}
        <Text style={styles.prayerText}>{novenaLadainhaClosing.versicle}</Text>
        <Text style={styles.prayerText}>{novenaLadainhaClosing.response}</Text>
        <Text style={styles.prayerText}>{novenaLadainhaClosing.prayer}</Text>
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Rogai por nós" title="Versículo de encerramento" />
        <Text style={styles.prayerText}>{novenaClosingVersicle.celebrant}</Text>
        <Text style={styles.prayerText}>{novenaClosingVersicle.people}</Text>
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Encerramento" title="Oração final" />
        <Text style={styles.prayerText}>{novenaFinalPrayer}</Text>
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Anexo C" title="Cantos de Frei Luís Ventura, OFM Conv." />
        {novenaSongs.map((song) => (
          <View key={song.title} style={styles.transitoLine}>
            <Text style={styles.speakerLabel}>{song.title}</Text>
            {song.lyrics.map((stanza, index) => (
              <Text key={`${song.title}-${index}`} style={styles.prayerText}>
                {stanza}
              </Text>
            ))}
          </View>
        ))}
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
        subtitle="I Vésperas (04 de outubro) seguidas da celebração dramatizada do Transitus, tradicionalmente rezada na véspera, 03 de outubro."
      />

      {transitoSections.map((section, index) => {
        const previousPart = transitoSections[index - 1]?.part;
        const isFirstOfPart = section.part !== previousPart;

        return (
          <View key={section.id} style={styles.sectionWrapper}>
            {isFirstOfPart ? (
              <Text style={styles.partHeading}>
                {section.part === "vesperas" ? "I Vésperas de São Francisco" : "Transitus (celebração dramatizada)"}
              </Text>
            ) : null}
            <View style={styles.card}>
              <EditorialSectionHeader eyebrow="Repertório" title={section.title} />
              {section.lines.map((line, lineIndex) => (
                <View key={`${section.id}-${lineIndex}`} style={styles.transitoLine}>
                  {line.speaker ? <Text style={styles.speakerLabel}>{line.speaker}</Text> : null}
                  <Text style={styles.prayerText}>{line.text}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
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
  partHeading: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.display,
    fontSize: typography.title,
    fontWeight: "700",
    paddingTop: spacing.md,
  },
  sectionWrapper: {
    gap: spacing.md,
  },
});
