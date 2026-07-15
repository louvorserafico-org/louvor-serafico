import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

const freiLuisLogo = require("../assets/frei-luis-logo.png");
const freiLuisLogoUri = Asset.fromModule(freiLuisLogo).uri;

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Sobre" }} />
      <PageHeader
        eyebrow="Sobre"
        title="Louvor Seráfico"
        subtitle="Um app pensado por e para músicos, a serviço da liturgia e da espiritualidade franciscana."
      />

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="O app" title="Por que o Louvor Seráfico existe" showDivider={false} />
        <Text style={styles.text}>
          O Louvor Seráfico nasceu para colocar, na mão do músico, o repertório certo para cada celebração:
          cantos organizados por momento da missa, partituras, áudios de referência e o calendário litúrgico
          franciscano, tudo em um só lugar.
        </Text>
        <Text style={styles.text}>
          O objetivo é simples e ambicioso ao mesmo tempo: tornar as celebrações mais ricas e mais
          franciscanas, ajudando quem serve na música a se preparar com mais tempo, mais beleza e mais
          espiritualidade — do jeito que São Francisco viveria o louvor.
        </Text>
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader eyebrow="Idealizador" title="Frei Luís Ventura, OFMConv" showDivider={false} />
        <Text style={styles.text}>
          Frei Luís Ventura — Luís Henrique de Oliveira Ventura — é frade franciscano conventual, sacerdote,
          pianista e compositor brasileiro. Nascido em 02 de fevereiro de 1994, em Patos de Minas (MG), cresceu
          em Ceilândia (DF), onde serviu como coroinha ainda na adolescência e começou a discernir sua vocação.
        </Text>
        <Text style={styles.text}>
          Ingressou na Ordem dos Frades Menores Conventuais em 2012, fez a Profissão Solene em 2020 e foi
          ordenado sacerdote em 2021. Ao longo da formação, aprofundou-se no piano erudito e passou a compor
          músicas franciscanas para a liturgia — o mesmo repertório que hoje ganha vida dentro deste app.
        </Text>
        <Text style={styles.text}>
          Como pianista e compositor, Frei Luís dedica sua música à oração e à evangelização, com álbuns e
          singles como "O Crucificado", "Centelhas" e "Difusivo Serafim", sempre marcados pela simplicidade e
          pela ternura próprias da espiritualidade de São Francisco de Assis.
        </Text>
      </View>

      <View style={styles.creditCard}>
        <Text style={styles.creditLabel}>Feito por</Text>
        <Image resizeMode="contain" source={{ uri: freiLuisLogoUri }} style={styles.creditLogo} />
      </View>
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
    gap: spacing.md,
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  creditCard: {
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  creditLabel: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  creditLogo: {
    height: 48,
    width: 48,
  },
  text: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
});
