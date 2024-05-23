import { ModalOpportunityProvider } from '@/modules/sales/components/modals/opportunity';
import { TableHistoryOpportunity } from './table-historyOpportunity';

export default function HistoryOpportunityPage() {
  return (
    <ModalOpportunityProvider>
      <TableHistoryOpportunity />
    </ModalOpportunityProvider>
  );
}
