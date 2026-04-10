import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';


const StatCard = ({ label, value, accent = false }) => (
  <View style={[styles.statCard, accent && styles.statCardAccent]}>
    <Text style={[styles.statValue, accent && styles.statValueAccent]}>{value}</Text>
    <Text style={[styles.statLabel, accent && styles.statLabelAccent]}>{label}</Text>
  </View>
);

const NextPayoutCard = () => (
  <View style={styles.payoutCard}>
    <View>
      <Text style={styles.payoutLabel}>Next Payout</Text>
      <Text style={styles.payoutName}>Fatou Jallow</Text>
      <Text style={styles.payoutDate}>Due in 4 days</Text>
    </View>
    <View style={styles.payoutAmount}>
      <Text style={styles.payoutAmountLabel}>Total</Text>
      <Text style={styles.payoutAmountValue}>D 5,000</Text>
    </View>
  </View>
);

const QuickAction = ({ label, emoji, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.quickActionIcon}>
      <Text style={styles.quickActionEmoji}>{emoji}</Text>
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

const GroupRow = ({ group, onPress }) => (
  <TouchableOpacity style={styles.groupRow} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.groupAvatar}>
      <Text style={styles.groupAvatarText}>{group.name[0]}</Text>
    </View>
    <View style={styles.groupInfo}>
      <Text style={styles.groupName}>{group.name}</Text>
      <Text style={styles.groupMeta}>{group.members} members · D{group.amount}/week</Text>
    </View>
    <View style={[styles.groupBadge, group.myTurn && styles.groupBadgeActive]}>
      <Text style={[styles.groupBadgeText, group.myTurn && styles.groupBadgeTextActive]}>
        {group.myTurn ? 'Your turn!' : `#${group.position}`}
      </Text>
    </View>
  </TouchableOpacity>
);



export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

 
  const groups = [
    { id: 1, name: 'Market Women Circle', members: 10, amount: 500, position: 3, myTurn: false },
    { id: 2, name: 'Family Savings', members: 6, amount: 200, position: 1, myTurn: true },
    { id: 3, name: 'GTTI Staff Osusu', members: 15, amount: 1000, position: 8, myTurn: false },
  ];

  const firstName = user?.name?.split(' ')[0] || 'Friend';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

    
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>{firstName} 👋</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
      
        <View style={styles.statsRow}>
          <StatCard label="Active Groups" value="3" />
          <StatCard label="This Month" value="D 700" />
          <StatCard label="Total Saved" value="D 4.2k" accent />
        </View>

      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Payout</Text>
          <NextPayoutCard />
        </View>

        {/* Quick actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickAction
              label="Create Group"
              emoji="➕"
              onPress={() => navigation.navigate('Groups', { screen: 'CreateGroup' })}
            />
            <QuickAction
              label="Join Group"
              emoji="🤝"
              onPress={() => navigation.navigate('Groups', { screen: 'JoinGroup' })}
            />
            <QuickAction
              label="Pay Now"
              emoji="💰"
              onPress={() => {}}
            />
            <QuickAction
              label="History"
              emoji="📋"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* My Groups */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Groups</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groupList}>
            {groups.map((g) => (
              <GroupRow
                key={g.id}
                group={g}
                onPress={() => navigation.navigate('Groups', {
                  screen: 'GroupDetail',
                  params: { groupId: g.id },
                })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.xl,
    paddingTop: SIZES.md,
  },
  greeting: {
    fontSize: SIZES.textMd,
    color: 'rgba(255,255,255,0.7)',
  },
  name: {
    fontSize: SIZES.textXxl,
    fontWeight: '800',
    color: COLORS.textOnPrimary,
    letterSpacing: -0.3,
  },
  notifBtn: {
    position: 'relative',
  },
  notifIcon: {
    fontSize: 24,
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: SIZES.lg,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    alignItems: 'center',
    ...SHADOWS.card,
  },
  statCardAccent: {
    backgroundColor: COLORS.primary,
  },
  statValue: {
    fontSize: SIZES.textLg,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 2,
  },
  statValueAccent: {
    color: COLORS.textOnPrimary,
  },
  statLabel: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statLabelAccent: {
    color: 'rgba(255,255,255,0.7)',
  },

  // Section
  section: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  sectionTitle: {
    fontSize: SIZES.textLg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  seeAll: {
    fontSize: SIZES.textSm,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Payout card
  payoutCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    ...SHADOWS.card,
  },
  payoutLabel: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  payoutName: {
    fontSize: SIZES.textLg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  payoutDate: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  payoutAmount: {
    alignItems: 'flex-end',
  },
  payoutAmountLabel: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  payoutAmountValue: {
    fontSize: SIZES.textXxl,
    fontWeight: '800',
    color: COLORS.primary,
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.xs,
    ...SHADOWS.card,
  },
  quickActionEmoji: {
    fontSize: 22,
  },
  quickActionLabel: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Group rows
  groupList: {
    gap: SIZES.sm,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    ...SHADOWS.card,
  },
  groupAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  groupAvatarText: {
    fontSize: SIZES.textLg,
    fontWeight: '700',
    color: COLORS.textOnPrimary,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: SIZES.textMd,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  groupMeta: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
  },
  groupBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.borderLight,
  },
  groupBadgeActive: {
    backgroundColor: COLORS.accent,
  },
  groupBadgeText: {
    fontSize: SIZES.textXs,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  groupBadgeTextActive: {
    color: COLORS.primaryDark,
  },
});
