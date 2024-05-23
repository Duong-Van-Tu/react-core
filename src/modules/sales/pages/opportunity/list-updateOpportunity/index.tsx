import { ModalOpportunityProvider } from '@/modules/sales/components/modals/opportunity';
import TableUpdateOpportunity from './table-updateOpportunity';

export function ListUpdateOpportunityPage() {
  return (
    <ModalOpportunityProvider>
      <TableUpdateOpportunity />
    </ModalOpportunityProvider>
  );
}
